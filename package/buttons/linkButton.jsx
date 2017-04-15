import React from 'react';
import createComponent from 'rce-pattern/createComponent';

import { view as Button } from './Button';

let name = 'linkButton';

let init = function() {};

let update = function({ type, payload, model, dispatch }) {};

let view = function(props) {
  let {
    children,
    className,
    ...otherProps
  } = props;

  return (
    <Button {...otherProps} className={`linkButton ${className}`}>
      {children}
    </Button>
  );
};


view = createComponent({ name, view, update });
export { init, view };
