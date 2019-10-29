import React from 'react';
import createClass from 'create-react-class';
import noop from 'lodash/noop';
import TetherClass from 'tether';
import createComponent from 'rce-pattern/createComponent';
import addESCListener from '../utils/escState';
import { increaseDepth, decreaseDepth } from '../utils/zIndexState';
import { enableScroll, disableScroll } from '../utils/scrollState';

let name = 'Tether';

let init = function() {
  return false;
};

let update = function({ type, model }) {
  if (type === 'show') {
    model.set(true);
  } else {
    model.set(false);
  }
};

let createTether = function(props) {
  let {
    attachment = 'top center',
    targetAttachment = 'bottom center',
    target,
    element
  } = props;
  let tetherInstance = new TetherClass({
    attachment,
    targetAttachment,
    target,
    element,
    optimizations: {
      gpu: false,
      moveElement: false
    },
    constraints: [
      {
        to: 'scrollParent',
        attachment: 'together'
      }
    ]
  });

  tetherInstance.disable();
  return tetherInstance;
};

let view = createClass({
  tetherInstance: null,
  triggerDOM: null,
  popupDOM: null,
  removeESCListener: null,

  tryEnableScroll() {
    let { shouldDisableScroll = true } = this.props;
    if (shouldDisableScroll) {
      enableScroll();
    }
  },

  tryDisableScroll() {
    let { shouldDisableScroll = true } = this.props;
    if (shouldDisableScroll) {
      disableScroll();
    }
  },

  createTetherInstance() {
    let {
      popupDOM,
      triggerContainer,
      props: {
        attachment,
        targetAttachment,
      }
    } = this;

    this.tetherInstance = createTether({
      attachment,
      targetAttachment,
      target: triggerContainer,
      element: popupDOM
    });
  },

  insertPopupDOM() {
    let { popupContainer } = this;
    let popupDOM = popupContainer.firstChild;
    document.body.appendChild(popupDOM);
    popupContainer.remove();
    this.popupDOM = popupDOM;
  },

  componentWillUnmount() {
    if (this.tetherInstance) {
      this.tetherInstance.destroy();
      this.popupDOM.remove();
    }
  },

  getInitialState() {
    return { isPopupMounted: false };
  },

  tryInitTether(callback) {
    let {
      tetherInstance,
      insertPopupDOM,
      createTetherInstance
    } = this;

    if (tetherInstance) {
      callback();
      return;
    }

    this.setState({ isPopupMounted: true }, () => {
      insertPopupDOM();
      createTetherInstance();
      callback();
    });
  },

  showPopup() {
    let {
      model,
      disabled = false,
    } = this.props;

    if ( disabled || model.val() ) return;

    let {
      afterTetherInited,
      tryInitTether
    } = this;

    tryInitTether(afterTetherInited);
  },

  afterTetherInited() {
    let {
      dispatch,
      beforeShow = noop,
      afterShow = noop,
    } = this.props;

    let {
      popupDOM,
      tetherInstance,
      hidePopup,
      tryDisableScroll,
      triggerContainer: triggerDOM
    } = this;

    beforeShow({ triggerDOM, popupDOM });

    tetherInstance.enable();
    tetherInstance.position();
    dispatch('show');
    increaseDepth(popupDOM);
    tryDisableScroll();
    this.removeESCListener = addESCListener(hidePopup);

    afterShow({ triggerDOM, popupDOM });
  },

  hidePopup() {
    let {
      dispatch,
      model,
      popupCloseAnimDuration = 300,
      beforeHide = noop,
      afterHide = noop,
    } = this.props;

    if ( !model.val() ) return;

    let {
      tetherInstance,
      removeESCListener,
      popupDOM,
      tryEnableScroll,
      triggerContainer: triggerDOM
    } = this;

    beforeHide({ triggerDOM, popupDOM });

    dispatch('hide');
    removeESCListener();
    tetherInstance.disable();

    setTimeout(() => {
      tryEnableScroll();
      decreaseDepth(popupDOM);
      afterHide({ triggerDOM, popupDOM });
    }, popupCloseAnimDuration);
  },

  render() {
    let { trigger, popup, model, ...otherProps } = this.props;
    let { showPopup, hidePopup } = this;
    let { isPopupMounted } = this.state;

    let childProps = {
      ...otherProps,
      showPopup,
      hidePopup,
      isShown: model.val(),
    };

    let _trigger = React.cloneElement(trigger, childProps);
    let _popup = React.cloneElement(popup, childProps);

    return (
      <div className="tether_triggerContainer"
        ref={e => this.triggerContainer = e}
      >
        {_trigger}
        {
          isPopupMounted &&
          <div ref={e => this.popupContainer = e}>{_popup}</div>
        }
      </div>
    );
  },
});



view = createComponent({ name, view, update });
export default view;
export { init, view };
