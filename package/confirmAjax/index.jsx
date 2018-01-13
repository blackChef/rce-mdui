import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { view as Dialog, init as dialogInit } from '../dialogForm/';

let name = 'ConfirmAjax';

let init = dialogInit;

let Content = function({ msg }) {
  return <div className="u_fontSize_title">{msg}</div>;
};

let view  = function(props) {
  let {
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
export { init, view };