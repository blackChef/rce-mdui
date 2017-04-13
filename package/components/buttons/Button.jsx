import React from 'react';
import createComponent from 'rce-pattern/createComponent';

let name = 'button';

let init = function() {};

let update = function() {};

let view = function(props) {
  let {
    model,
    dispatch,
    dispatcher,
    children,
    className,
    tagName = 'button',
    type = 'button',
    ...otherProps
  } = props;

  let ButtonTag = tagName;

  return (
    <ButtonTag
      {...otherProps}
      type={type}
      className={className}
    >
      <div className="buttonContent">{children}</div>
    </ButtonTag>
  );
};

view = createComponent({ name, view, update });
export { view, init };
