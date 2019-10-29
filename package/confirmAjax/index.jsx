import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { view as Dialog, init as dialogInit } from '../dialogForm/';

const name = 'ConfirmAjax';

const init = dialogInit;

const Content = function({ msg }) {
  return <div className="u_fontSize_title">{msg}</div>;
};

let view  = function(props) {
  const {
    model,
    apiCall,
    ...otherProps
  } = props;

  return (
    <Dialog
      {...otherProps}
      showContentImmediately={true}
      model={model}
      apiCalls={{ saveContent: apiCall }}
      content={<Content {...props}/>}
    />
  );
};



view = createComponent({ name, view });
export default view;
export { init, view };
