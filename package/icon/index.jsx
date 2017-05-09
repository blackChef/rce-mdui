import React from 'react';
import createComponent from 'rce-pattern/createComponent';

let name = 'icon';

let init = function() {};

let update = function({ type, payload, model, dispatch }) {};

let view = function(props) {
  let {
    model,
    dispatch,
    dispatcher,
    type,
    icon = type,
    className = '',
    ...otherProps
  } = props;

  return (
    <i {...otherProps} className={`mdIcon ${className}`}>{icon}</i>
  );
};

view = createComponent({ name, view, update });
export { init, view };