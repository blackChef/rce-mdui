import React from 'react';
import createClass from 'create-react-class';
import noop from 'lodash/noop';
import TetherClass from 'tether';
import createComponent from 'rce-pattern/createComponent';
import addESCListener from '../utils/escState';
import { increaseDepth, decreaseDepth } from '../utils/zIndexState';
import { enableScroll, disableScroll } from '../utils/scrollState';

const name = 'Tether';

const init = function() {
  return false;
};

const update = function({ type, model }) {
  if (type === 'show') {
    model.set(true);
  } else {
    model.set(false);
  }
};

const createTether = function(props) {
  const {
    attachment = 'top center',
    targetAttachment = 'bottom center',
    target,
    element
  } = props;
  const tetherInstance = new TetherClass({
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
    const { shouldDisableScroll = true } = this.props;
    if (shouldDisableScroll) {
      enableScroll();
    }
  },

  tryDisableScroll() {
    const { shouldDisableScroll = true } = this.props;
    if (shouldDisableScroll) {
      disableScroll();
    }
  },

  createTetherInstance() {
    const {
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
    const { popupContainer } = this;
    const popupDOM = popupContainer.firstChild;
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
    const {
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
    const {
      model,
      disabled = false,
    } = this.props;

    if ( disabled || model.val() ) return;

    const {
      afterTetherInited,
      tryInitTether
    } = this;

    tryInitTether(afterTetherInited);
  },

  afterTetherInited() {
    const {
      dispatch,
      beforeShow = noop,
      afterShow = noop,
    } = this.props;

    const {
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
    const {
      dispatch,
      model,
      popupCloseAnimDuration = 300,
      beforeHide = noop,
      afterHide = noop,
    } = this.props;

    if ( !model.val() ) return;

    const {
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
    const { trigger, popup, model, ...otherProps } = this.props;
    const { showPopup, hidePopup } = this;
    const { isPopupMounted } = this.state;

    const childProps = {
      ...otherProps,
      showPopup,
      hidePopup,
      isShown: model.val(),
    };

    const _trigger = React.cloneElement(trigger, childProps);
    const _popup = React.cloneElement(popup, childProps);

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
