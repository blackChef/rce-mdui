import React from 'react';
import createComponent from 'rce-pattern/createComponent';

import { view as Button } from './Button';

const name = 'linkButton';

const init = function() {};

let view = function(props) {
  const {
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
export default view;
export { init, view };

