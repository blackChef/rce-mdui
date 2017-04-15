import React from 'react';
import noop from 'lodash/noop';
import TetherClass from 'tether';
import createComponent from 'rce-pattern/createComponent';
import { openPopup } from '../popup/popupStack';



let name = 'Tether';

let init = function() {
  return false;
};

let update = function({ type, payload, model, dispatch }) {
  if (type === 'show') {
    model.set(true);
  } else {
    model.set(false);
  }
};

let view = React.createClass({
  createTetherInstance() {
    let {
      attachment = 'top center',
      targetAttachment = 'bottom center',
    } = this.props;

    let { triggerDOM, popupDOM } = this;

    this.tetherInstance = new TetherClass({
      attachment,
      targetAttachment,
      target: triggerDOM,
      element: popupDOM,
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

    this.tetherInstance.disable();
  },

  insertTriggerDOM() {
    let {
      container,
      triggerContainer,
    } = this.refs;

    let triggerDOM = triggerContainer.firstChild;
    container.parentNode.insertBefore(triggerDOM, container);

    // We use containers to find dom. After init, we can safely remove theme.
    // However root container is kept, so we don't get react inject dom error.
    triggerContainer.remove();
    this.triggerDOM = triggerDOM;
  },

  insertPopupDOM() {
    let {
      container,
      popupContainer
    } = this.refs;

    let popupDOM = popupContainer.firstChild;
    document.body.appendChild(popupDOM);
    popupContainer.remove();
    this.popupDOM = popupDOM;
  },

  componentDidMount() {
    this.insertTriggerDOM();

    // instance is not created util opened
    let { createOnShow = true } = this.props;
    if (createOnShow === false) this.createTetherInstance();
  },

  componentWillUnmount() {
    if (this.tetherInstance) {
      this.popupDOM.remove();
      this.tetherInstance.destroy();
    }
  },

  getInitialState() {
    return { isPopupMounted: false };
  },

  showPopup() {
    let {
      model,
      createOnShow = true,
      disabled = false,
    } = this.props;

    if ( disabled || model.val() ) return;

    let { tetherInstance, insertPopupDOM, createTetherInstance, afterTetherInited } = this;
    if (createOnShow && !tetherInstance) {
      this.setState({ isPopupMounted: true }, () => {
        insertPopupDOM();
        createTetherInstance();
        afterTetherInited();
      });
    } else {
      afterTetherInited();
    }
  },

  afterTetherInited() {
    let { popupDOM, triggerDOM, tetherInstance } = this;
    let {
      dispatch,
      disableScroll = true,
      beforeShow = noop,
      afterShow = noop,
    } = this.props;

    beforeShow({ popupDOM, triggerDOM });
    tetherInstance.enable();
    tetherInstance.position();
    dispatch('show');
    this.closePopup = openPopup(popupDOM, disableScroll);
    afterShow({ popupDOM, triggerDOM });
  },

  hidePopup() {
    let {
      dispatch,
      model,
      popupCloseAnimDuration = 300,
      beforeHide = noop,
      afterHide = noop,
    } = this.props;

    let { tetherInstance, closePopup, popupDOM, triggerDOM } = this;

    if ( !model.val() ) return;

    beforeHide({ popupDOM, triggerDOM });
    dispatch('hide');
    closePopup(popupCloseAnimDuration);
    tetherInstance.disable();
    afterHide({ popupDOM, triggerDOM });
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
      <div className="tether_placeholder" style={{ display: 'none' }} ref="container">
        <div ref="triggerContainer">{_trigger}</div>
        { isPopupMounted && <div ref="popupContainer">{_popup}</div> }
      </div>
    );
  },
});



view = createComponent({ name, view, update });
export { init, view };