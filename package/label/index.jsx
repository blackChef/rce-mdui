import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import './index.scss';


const name = 'Label';

const init = function() {};

let view = function(props) {
  const {
    // eslint-disable-next-line no-unused-vars
    model, dispatch, dispatcher,
    type = 'default',
    children,
    className = '',
    ...otherProps
  } = props;

  const classNames = `label label--${type} ${className}`;

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
export default view;
export { init, view };
