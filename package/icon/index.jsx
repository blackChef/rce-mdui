import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import './index.scss';

let name = 'icon';

let init = function() {};

let view = function(props) {
  let {
    icon: Icon, // react class or react element
    className = '',
    size = 24,
  } = props;

  let _icon = React.isValidElement(Icon) ? Icon : <Icon />;

  return (
    <div className={`mdIcon ${className}`} style={{ fontSize: `${size}px` }}>
      {_icon}
    </div>
  );
};

view = createComponent({ name, view });
export { init, view };