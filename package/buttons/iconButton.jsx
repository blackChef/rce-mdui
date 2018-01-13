import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { view as Icon } from '../icon/';
import { view as Button } from './Button';


let name = 'iconButton';

let init = function() {};

let view = function(props) {
  let {
    children,
    icon,
    className  = '',
    ...otherProps
  } = props;

  let content = icon ? <Icon icon={icon} /> : children;

  return (
    <Button
      {...otherProps}
      className={`iconButton ${className}`}
    >
      {content}
    </Button>
  );
};


view = createComponent({ name, view });
export { init, view };