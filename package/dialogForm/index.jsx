import React from 'react';
import noop from 'lodash/noop';
import createComponent from 'rce-pattern/createComponent';
import { view as Transition } from '../transition/appear';
import { view as Dialog } from '../dialog/';
import { view as Slot } from '../slot/';
import { view as LinkButton } from '../buttons/linkButton';
import { view as PopupForm, init as popupFormInit } from '../popupForm/';

let name = 'DialogForm';
let init = popupFormInit;
let update = noop;

let renderMsg = function(model) {
  if (model.isInvalid.val()) {
    return (
      <aside className="infoBanner infoBanner--error">
        {model.invalidMsg.val()}
      </aside>
    );
  }
};

let renderContent = function(props) {
  let {
    model,
    content,
    Form,
    showContentImmediately = false,
    getData,
    transitionType = "slideUp"
  } = props;

  let { isContentReady, isOpenAnimationEnd } = model.val();

  if (
      showContentImmediately ||
      (isContentReady && isOpenAnimationEnd)
    ) {
    let body = React.cloneElement(content, {
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

let OkBtn = function(props) {
  let {
    model, formId, okLabel = '确认'
  } = props;

  let {
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

let CancelBtn = function(props) {
  let {
    model, forceOpen, tryToClose, cancelLabel = '取消'
  } = props;
  let { isSaving } = model.val();
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

let Body = function(props) {
  let {
    model,
    title,
    onOpen, afterOpen, LoadingScreen,
    ...otherProps
  } = props;
  let { isSaving } = model.val();
  return (
    <Dialog
      {...otherProps}
      model={model.show}
      onOpen={onOpen}
      afterOpen={afterOpen}
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
      <Body {...props}/>
    </PopupForm>
  );
};

view = createComponent({ name, view, update });
export { init, view };
