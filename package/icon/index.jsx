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
    icon: Icon,
    isReactClass = true,
    className = '',
    size = 24,
    ...otherProps
  } = props;

  return (
    <div className={`mdIcon ${className}`} style={{ width: size }}>
      { isReactClass ? <Icon /> : Icon }
    </div>
  );
};

view = createComponent({ name, view, update });
export { init, view };