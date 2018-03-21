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

let update = function({ type, model }) {
  if (type === 'close') {
    model.set(false);
  }
};


let view = createClass({
  getInitialState() {
    return {
      openAnimationState: '',
      closeAnimationState: '',
    };
  },
  componentDidMount() {
    if ( this.props.model.val() ) {
      this.willOpen();
    }
  },

  componentWillUnmount() {
    this.isUnMounted = true;

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

  workAroundIOSInputBug(isOpen) {
    if (this.isIOS === undefined) {
      let userAgent = window.navigator.userAgent;
      let r1 = /cfnetwork\/.+darwin/i;
      let r2 = /ip[honead]+(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i;
      this.isIOS = r1.test(userAgent) || r2.test(userAgent);
    }

    if (this.isIOS === false) return;

    // fix iOS cursor messed up when focus in a input inside a fixed dialog
    if (isOpen) {
      // this should be done after scroll is disabled
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      // this should be done before scroll is enabled
      document.body.style.position = '';
      document.body.style.width = '';
    }
  },

  willOpen(props = this.props) {
    let {
      onOpen = noop,
      afterOpen = noop,
      openAnimationDuration = 400,
    } = props;

    onOpen();
    disableScroll();
    increaseDepth(this.contentRef);
    this.workAroundIOSInputBug(true);
    this.removeESCListener = addESCListener(this.tryToClose);

    this.setState({ openAnimationState: 'start' });
    setTimeout(() => {
      this.setState({ openAnimationState: 'end' });
      afterOpen();
    }, openAnimationDuration);
  },

  willClose(props = this.props) {
    let {
      onClose = noop,
      afterClose = noop,
      closeAnimationDuration = 400,
    } = props;

    this.removeESCListener();
    onClose();
    this.setState({ closeAnimationState: 'start' });

    setTimeout(() => {
      afterClose();
      this.workAroundIOSInputBug(false);
      enableScroll();
      decreaseDepth(this.contentRef);
      if (!this.isUnMounted) {
        this.setState({ closeAnimationState: 'end' });
      }
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
    let { openAnimationState, closeAnimationState } = this.state;
    return React.cloneElement(children, {
      forceOpen,
      tryToClose,
      openAnimationState,
      closeAnimationState,
    });
  },

  renderBg() {
    let {
      bgClassName = '',
      bgProps = {},
      closeOnBgClick = true
    } = this.props;
    let { className = '', ...otherProps } = bgProps;
    let { tryToClose } = this;
    return (
      <div
        { ...otherProps }
        className={`popup_background ${bgClassName} ${className}`}
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
        ref={e => this.contentRef = e}
      >
        {this.renderFront()}
        {this.renderBg()}
      </div>
    );
  },
});



view = createComponent({ name, init, view, update });
export { init, view };