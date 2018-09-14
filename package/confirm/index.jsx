import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { view as DialogSimple } from '../dialog/';
import { view as Slot, getSlotContent } from '../slot/';
import { view as LinkButton } from '../buttons/linkButton';
import noop from 'lodash/noop';

let name = 'Confirm';

let init = function() {
  return false;
};

let CancelBtn = function({ forceOpen, onCancel, tryToClose, cancelLabel = '取消' }) {
  let onClick = (() => {
    if (onCancel) {
      return () => onCancel(tryToClose);
    }
    return tryToClose;
  })();

  return (
    <LinkButton
      className="linkButton--bounded linkButton--primary rightGutter_margin_half"
      disabled={forceOpen}
      onClick={onClick}
    >
      {cancelLabel}
    </LinkButton>
  );
};


let OkBtn = function({ forceOpen, tryToClose, onConfirm = noop, okLabel = '确认' }) {
  return (
    <LinkButton
      className="linkButton--bounded linkButton--primary"
      disabled={forceOpen}
      onClick={() => onConfirm(tryToClose)}
    >
      {okLabel}
    </LinkButton>
  );
};

let view = function(props) {
  let {
    model,
    children,
    ...otherProps
  } = props;

  let content = getSlotContent(children, 'content');

  return (
    <DialogSimple {...otherProps} model={model} >
      <Slot name="content">{content}</Slot>
      <Slot name="actions">
        <CancelBtn {...props}/>
        <OkBtn {...props}/>
      </Slot>
    </DialogSimple>
  );
};



view = createComponent({ name, view });
export { init, view };