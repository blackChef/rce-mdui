import React from 'react';
import createComponent from 'rce-pattern/createComponent';

import { view as Button } from './Button';

let name = 'linkButton';

let init = function() {};

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


view = createComponent({ name, view });
export { init, view };
