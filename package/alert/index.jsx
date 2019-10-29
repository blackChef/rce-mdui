import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { view as DialogSimple } from '../dialog/';
import { view as Slot, getSlotContent } from '../slot/';
import { view as LinkButton } from '../buttons/linkButton';


const name = 'Alert';

const init = function() {
  return false;
};

const CloseBtn = function({ tryToClose, okLabel }) {
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
  const {
    // eslint-disable-next-line no-unused-vars
    model, dispatch, dispatcher,
    children,
    okLabel = '确定',
    closeOnBgClick = false,
    ...otherProps
  } = props;

  const content = getSlotContent(children, 'content');

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
export default view;
export { init, view };
