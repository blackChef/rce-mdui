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
    icon: Icon, // react class or react element
    className = '',
    size = 24,
    ...otherProps
  } = props;

  let _icon = React.isValidElement(Icon) ? Icon : <Icon />;

  return (
    <div className={`mdIcon ${className}`} style={{ fontSize: `${size}px` }}>
      {_icon}
    </div>
  );
};

view = createComponent({ name, view, update });
export { init, view };