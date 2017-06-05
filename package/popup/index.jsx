import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import noop from 'lodash/noop';
import checkProps from '../utils/checkProps';
import { addListener as addESCListener } from '../utils/escState';
import { increaseDepth, decreaseDepth } from '../utils/zIndexState';
import { enableScroll, disableScroll } from '../utils/scrollState';

let name = 'Popup';

let init = function() {
  return false;
};

let update = function({ type, payload, model, dispatch }) {
  if (type === 'close') {
    model.set(false);
  }
};

let view = React.createClass({
  componentDidMount() {
    this.isMounted = true;

    // If we move entire dom into body,
    // react might throw error: "Failed to execute 'insertBefore' on 'Node'".
    // Because react tries to find our component dom, but it's not there.
    // So we keep container in the inject position, only move content.
    document.body.appendChild(this.refs.content);

    if ( this.props.model.val() ) {
      this.willOpen();
    }
  },

  componentWillUnmount() {
    // if it's still opened, unmount should trigger onClose callback
    if ( this.props.model.val() ) {
      this.willClose();
    }

    this.refs.content.remove();
  },

  componentWillReceiveProps(nextProps) {
    let checkOpen = checkProps('model.val', this.props, nextProps);
    let willOpen = checkOpen(false, true);
    let willClose = checkOpen(true, false);
    if (willOpen) this.willOpen(nextProps);
    if (willClose) this.willClose(nextProps);
  },

  willOpen(props = this.props) {
    let {
      onOpen = noop,
      afterOpen = noop,
      openAnimationDuration = 400,
    } = props;

    let { content } = this.refs;

    onOpen();
    disableScroll();
    increaseDepth(content);
    this.removeESCListener = addESCListener(this.tryToClose);

    setTimeout(afterOpen, openAnimationDuration);
  },

  willClose(props = this.props) {
    let {
      onClose = noop,
      afterClose = noop,
      closeAnimationDuration = 400,
    } = props;

    let { closePopup } = this;
    let { content } = this.refs;

    onClose();

    setTimeout(() => {
      afterClose();
      enableScroll();
      decreaseDepth(content);
    }, closeAnimationDuration);
  },

  tryToClose() {
    let { forceOpen, dispatch } = this.props;
    let { removeESCListener } = this;

    if (!forceOpen) {
      dispatch('close');
      removeESCListener();
    }
  },

  renderFront() {
    let { tryToClose, isMounted } = this;

    if (!isMounted) return;

    let { forceOpen, children } = this.props;

    return React.cloneElement(children, {
      forceOpen,
      tryToClose,
    });
  },

  renderBg() {
    let { bgProps = {}, closeOnBgClick = true } = this.props;
    let {
      onClick,
      className = '',
      ...otherProps
    } = bgProps;

    return (
      <div
        className={`popup_background ${className}`}
        onClick={closeOnBgClick ? this.tryToClose : noop}
        { ...otherProps }
      />
    );
  },

  getClassName() {
    let { className = '', model } = this.props;
    let isOpen = model.val();
    return `popup ${className} ${isOpen ? 'is_active' : ''}`;
  },

  render() {
    return (
      <div className="popup_placeholder" style={{ display: 'none' }}>
        <div
          className={this.getClassName()}
          ref="content"
        >
          {this.renderFront()}
          {this.renderBg()}
        </div>
      </div>
    );
  },
});



view = createComponent({ name, init, view, update });
export { init, view };