import React from 'react';
import noop from 'lodash/noop';
import createComponent from 'rce-pattern/createComponent';
import { view as Transition } from '../transition/appear';
import { view as Dialog } from '../dialog/';
import { view as Slot } from '../slot/';
import { view as LinkButton } from '../buttons/linkButton';
import { view as PopupForm, init as popupFormInit } from '../popupForm/';

const name = 'DialogForm';
const init = popupFormInit;
const update = noop;

const renderMsg = function(model) {
  if (model.isInvalid.val()) {
    return (
      <aside className="infoBanner infoBanner--error">
        {model.invalidMsg.val()}
      </aside>
    );
  }
};

const renderContent = function(props) {
  const {
    model,
    content,
    Form,
    showContentImmediately = false,
    getData,
    transitionType = "slideUp"
  } = props;

  const { isContentReady, isOpenAnimationEnd } = model.val();

  if (
      showContentImmediately ||
      (isContentReady && isOpenAnimationEnd)
    ) {
    const body = React.cloneElement(content, {
      reloadDialog: getData,
      model: model.content,
      selectOptions: model.selectOptions.val(),
    });

    return (
      <Transition
        name={transitionType}
      >
        <Form>
          {renderMsg(model)}
          {body}
        </Form>
      </Transition>
    );
  }
};

const OkBtn = function(props) {
  const {
    model, formId, okLabel = '确认'
  } = props;

  const {
    isSaving,
    isContentReady,
  } = model.val();

  return (
    <LinkButton
      className="linkButton--bounded linkButton--primary"
      disabled={!isContentReady || isSaving}
      form={formId}
      type="submit"
    >
      {okLabel}
    </LinkButton>
  );
};

const CancelBtn = function(props) {
  const {
    model, forceOpen, tryToClose, cancelLabel = '取消'
  } = props;
  const { isSaving } = model.val();
  return (
    <LinkButton
      className="linkButton--bounded linkButton--primary rightGutter_margin_half"
      disabled={isSaving || forceOpen}
      onClick={tryToClose}
    >
      {cancelLabel}
    </LinkButton>
  );
};

const Body = function(props) {
  const {
    model,
    title,
    onOpen, afterOpen, LoadingScreen,
    _onOpen = noop, _afterOpen = noop,
    ...otherProps
  } = props;
  const { isSaving } = model.val();
  return (
    <Dialog
      {...otherProps}
      model={model.show}
      onOpen={() => {onOpen(); _onOpen();}}
      afterOpen={() => {afterOpen(); _afterOpen();}}
      forceOpen={isSaving}
    >
      <Slot name="title">{title}</Slot>

      <Slot name="content">
        {renderContent(props)}
      </Slot>

      <Slot name="actions">
        <CancelBtn {...props}/>
        <OkBtn {...props}/>
      </Slot>

      <Slot name="other">
        <LoadingScreen />
      </Slot>
    </Dialog>
  );
};

let view = function(props) {
  return (
    <PopupForm {...props}>
      <Body {...props} _afterOpen={props.afterOpen} _onOpen={props.onOpen}/>
    </PopupForm>
  );
};

view = createComponent({ name, view, update });
export default view;
export { init, view };

