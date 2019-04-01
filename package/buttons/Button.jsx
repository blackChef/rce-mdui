import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import './index.scss';

let name = 'button';

let init = function() {};

let view = function(props) {
  let {
    children,
    className,
    tagName: ButtonTag = 'button',
    type = 'button',
    // eslint-disable-next-line no-unused-vars
    model, dispatch, dispatcher,
    ...otherProps
  } = props;

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

view = createComponent({ name, view });
export { view, init };
