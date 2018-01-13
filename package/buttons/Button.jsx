import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import omit from 'lodash/omit';

let name = 'button';

let init = function() {};

let view = function(props) {
  let {
    children,
    className,
    tagName: ButtonTag = 'button',
    type = 'button',
    ...otherProps
  } = props;

  return (
    <ButtonTag
      {...omit(otherProps, ['model', 'dispatch', 'dispatcher'])}
      type={type}
      className={className}
    >
      <div className="buttonContent">{children}</div>
    </ButtonTag>
  );
};

view = createComponent({ name, view });
export { view, init };
