import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import './index.scss';


let name = 'Label';

let init = function() {};

let view = function(props) {
  let {
    // eslint-disable-next-line no-unused-vars
    model, dispatch, dispatcher,
    type = 'default',
    children,
    className = '',
    ...otherProps
  } = props;

  let classNames = `label label--${type} ${className}`;

  return (
    <div
      {...otherProps}
      className={classNames}
    >
      {children}
    </div>
  );
};



view = createComponent({ name, view });
export { init, view };