import React from 'react';
import createComponent from 'rce-pattern/createComponent';

import { view as Icon } from '../icon/';
import { view as Button } from './Button';

let name = 'fab';

let init = function() {};

let update = function({ type, payload, model, dispatch }) {};

let view = function(props) {
  let {
    children,
    icon,
    className,
    ...otherProps
  } = props;

  let content = icon ? <Icon type={icon} /> : children;

  return (
    <Button {...otherProps} className={`fab ${className}`}>
      {content}
    </Button>
  );
};


view = createComponent({ name, view, update });
export { init, view };