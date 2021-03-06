import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import noop from 'lodash/noop';
import { matchValues } from '../utils/checkProps';
import addESCListener from '../utils/escState';
import { increaseDepth, decreaseDepth } from '../utils/zIndexState';
import { enableScroll, disableScroll } from '../utils/scrollState';



const name = 'Popup';

const init = function() {
  return false;
};

const update = function({ type, model }) {
  if (type === 'close') {
    model.set(false);
  }
};


let view = createClass({
  getInitialState() {
    return {
      openAnimationState: '',
      closeAnimationState: '',
      shouldRender: false,
      isOpen: false,
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

  componentDidUpdate(prevProps) {
    const checkOpen = matchValues('model.val', this.props, prevProps);
    const willOpen = checkOpen(true, false);
    const willClose = checkOpen(false, true);
    if (willOpen) this.willOpen(this.props);
    if (willClose) this.willClose(this.props);
  },

  workAroundIOSInputBug(isOpen) {
    if (this.isIOS === undefined) {
      const userAgent = window.navigator.userAgent;
      const r1 = /cfnetwork\/.+darwin/i;
      const r2 = /ip[honead]+(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i;
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
    const {
      onOpen = noop,
      afterOpen = noop,
      openAnimationDuration = 400,
    } = props;

    const open = () => {
      setTimeout(() => {
        this.setState({ isOpen: true });
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
      }, 20);
    };

    this.setState({ shouldRender: true }, open);
  },

  willClose(props = this.props) {
    const {
      onClose = noop,
      afterClose = noop,
      closeAnimationDuration = 400,
      unMountAfterClose = false,
    } = props;

    this.removeESCListener();
    this.setState({
      isOpen: false,
      closeAnimationState: 'start'
    });
    onClose();
    setTimeout(() => {
      afterClose();
      this.workAroundIOSInputBug(false);
      enableScroll();
      decreaseDepth(this.contentRef);
      if (!this.isUnMounted) {
        this.setState({ closeAnimationState: 'end' });
      }

      // Unmounting large DOM may cause performance problem,
      // so it's disabled by default
      if (unMountAfterClose) {
        setTimeout(() => {
          if (!this.isUnMounted) {
            this.setState({ shouldRender: false });
          }
        }, 20);
      }
    }, closeAnimationDuration);
  },

  tryToClose() {
    const { forceOpen, dispatch } = this.props;
    if (!forceOpen) {
      dispatch('close');
    }
  },

  renderFront() {
    const { tryToClose } = this;
    const { forceOpen, children } = this.props;
    const { openAnimationState, closeAnimationState } = this.state;
    return React.cloneElement(children, {
      forceOpen,
      tryToClose,
      openAnimationState,
      closeAnimationState,
    });
  },

  renderBg() {
    const {
      bgClassName = '',
      bgProps = {},
      closeOnBgClick = true
    } = this.props;
    const { className = '', ...otherProps } = bgProps;
    const { tryToClose } = this;
    return (
      <div
        { ...otherProps }
        className={`popup_background ${bgClassName} ${className}`}
        onClick={closeOnBgClick ? tryToClose : noop}
      />
    );
  },

  getClassName() {
    const { className = '' } = this.props;
    const { isOpen } = this.state;
    return `popup ${className} ${isOpen ? 'is_active' : ''}`;
  },

  render() {
    const { style } = this.props;
    const { shouldRender } =  this.state;
    if (!shouldRender) return null;
    return (
      <div
        className={this.getClassName()}
        ref={e => this.contentRef = e}
        style={style}
      >
        {this.renderFront()}
        {this.renderBg()}
      </div>
    );
  },
});



view = createComponent({ name, init, view, update });
export default view;
export { init, view };
