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
    icon,
    className = '',
    size = 24,
    ...otherProps
  } = props;

  if (React.isValidElement(icon)) {}

  let _icon = React.isValidElement(icon) ? icon : React.createElement(icon);

  return (
    <div className={`mdIcon ${className}`} style={{ width: size }}>
      {_icon}
    </div>
  );
};

view = createComponent({ name, view, update });
export { init, view };