import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import omit from 'lodash/omit';


let name = 'Label';

let init = function() {};

let view = function(props) {
  let {
    type = 'default',
    children,
    className = '',
    ...otherProps
  } = props;

  let classNames = `label label--${type} ${className}`;

  return (
    <div
      {...omit(otherProps, ['model', 'dispatch', 'dispatcher'])}
      className={classNames}
    >
      {children}
    </div>
  );
};



view = createComponent({ name, view });
export { init, view };