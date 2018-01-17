import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { view as DialogSimple } from '../dialog/';
import { view as Slot, getSlotContent } from '../slot/';
import { view as LinkButton } from '../buttons/linkButton';


let name = 'Alert';

let init = function() {
  return false;
};

let CloseBtn = function({ tryToClose, okLabel }) {
  return (
    <LinkButton
      className="linkButton--primary linkButton--bounded"
      onClick={tryToClose}
    >
      {okLabel}
    </LinkButton>
  );
};

let view = function(props) {
  let {
    // eslint-disable-next-line no-unused-vars
    model, dispatch, dispatcher,
    children,
    okLabel = '确定',
    closeOnBgClick = false,
    ...otherProps
  } = props;

  let content = getSlotContent(children, 'content');

  return (
    <DialogSimple {...otherProps}
      model={model}
      closeOnBgClick={closeOnBgClick}
    >
      <Slot name="content">{content}</Slot>
      <Slot name="actions">
        <CloseBtn okLabel={okLabel}/>
      </Slot>
    </DialogSimple>
  );
};



view = createComponent({ name, view });
export { init, view };