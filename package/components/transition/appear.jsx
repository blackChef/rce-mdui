import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

let view = function(props) {
  let {
    children,
    timeout = 400,
    name = '',
    component = 'div',
    transitionName,
    transitionAppear,
    transitionAppearTimeout,
    transitionEnter,
    transitionLeave,
    ...otherProps
  } = props;

  let names = {
    appear: name,
    appearActive: `${name}_active`
  };

  return (
    <ReactCSSTransitionGroup
      transitionName={names}
      transitionAppear={true}
      transitionAppearTimeout={timeout}
      transitionEnter={false}
      transitionLeave={false}
      className="reactTransitionHelper"
      component={component}
      {...otherProps}
    >
      {children}
    </ReactCSSTransitionGroup>
  );
};

view.displayName = 'transitionGroup--appear';
export { view };