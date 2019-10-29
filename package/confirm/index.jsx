import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { view as DialogSimple } from '../dialog/';
import { view as Slot, getSlotContent } from '../slot/';
import { view as LinkButton } from '../buttons/linkButton';
import noop from 'lodash/noop';

const name = 'Confirm';

const init = function() {
  return false;
};

const CancelBtn = function({ forceOpen, onCancel, tryToClose, cancelLabel = '取消' }) {
  const onClick = (() => {
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


const OkBtn = function({ forceOpen, tryToClose, onConfirm = noop, okLabel = '确认' }) {
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
  const {
    model,
    children,
    ...otherProps
  } = props;

  const content = getSlotContent(children, 'content');

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
export default view;
export { init, view };
