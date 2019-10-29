import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import './index.scss';

const name = 'icon';

const init = function() {};

let view = function(props) {
  const {
    icon: Icon, // react class or react element
    className = '',
    size = 24,
  } = props;

  const _icon = React.isValidElement(Icon) ? Icon : <Icon />;

  return (
    <div className={`mdIcon ${className}`} style={{ fontSize: `${size}px` }}>
      {_icon}
    </div>
  );
};

view = createComponent({ name, view });
export default view;
export { init, view };
