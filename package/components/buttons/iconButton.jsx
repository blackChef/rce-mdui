import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { view as Icon } from '../icon/';
import { view as Button } from './Button';


let name = 'iconButton';

let init = function() {};

let update = function({ type, payload, model, dispatch }) {};

let view = function(props) {
  let {
    children,
    type,
    icon = type,
    className,
    ...otherProps
  } = props;

  let content = icon ? <Icon type={icon} /> : children;

  return (
    <Button
      {...otherProps}
      className={`iconButton iconButton--unbounded ${className}`}
    >
      {content}
    </Button>
  );
};


view = createComponent({ name, view, update });
export { init, view };