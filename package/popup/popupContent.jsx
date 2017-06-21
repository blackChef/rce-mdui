import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import noop from 'lodash/noop';
import { matchValues } from '../utils/checkProps';
import addESCListener from '../utils/escState';
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

let view = createClass({
  componentDidMount() {
    if ( this.props.model.val() ) {
      this.willOpen();
    }
  },

  componentWillUnmount() {
    // if it's still opened, unmount should trigger onClose callback
    if ( this.props.model.val() ) {
      this.willClose();
    }
  },

  componentWillReceiveProps(nextProps) {
    let checkOpen = matchValues('model.val', this.props, nextProps);
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

    let { removeESCListener } = this;
    let { content } = this.refs;

    removeESCListener();
    onClose();

    setTimeout(() => {
      afterClose();
      enableScroll();
      decreaseDepth(content);
    }, closeAnimationDuration);
  },

  tryToClose() {
    let { forceOpen, dispatch } = this.props;
    if (!forceOpen) {
      dispatch('close');
    }
  },

  renderFront() {
    let { tryToClose } = this;
    let { forceOpen, children } = this.props;
    return React.cloneElement(children, {
      forceOpen,
      tryToClose,
    });
  },

  renderBg() {
    let {
      bgProps = {},
      closeOnBgClick = true
    } = this.props;
    let {
      onClick,
      className = '',
      ...otherProps
    } = bgProps;
    let { tryToClose } = this;

    return (
      <div
        { ...otherProps }
        className={`popup_background ${className}`}
        onClick={closeOnBgClick ? tryToClose : noop}
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
      <div
        className={this.getClassName()}
        ref="content"
      >
        {this.renderFront()}
        {this.renderBg()}
      </div>
    );
  },
});



view = createComponent({ name, init, view, update });
export { init, view };