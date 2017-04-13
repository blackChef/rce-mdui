import React from 'react';
import createComponent from 'rce-pattern/createComponent';



let name = 'Label';

let init = function() {};

let update = function({ type, payload, model, dispatch }) {};

let view = function(props) {
  let {
    model, dispatch, dispatcher, type = 'default', children, className = '',
    ...otherProps
  } = props;

  let classNames = `label label--${type} ${className}`;

  return (
    <div className={classNames} {...otherProps}>{children}</div>
  );
};



view = createComponent({ name, view, update });
export { init, view };