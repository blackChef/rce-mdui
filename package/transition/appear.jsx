import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

let view = function(props) {
  let {
    children,
    timeout = 400,
    name = '',
    component = 'div',
    className = 'reactTransitionHelper',
    ...otherProps
  } = props;

  let names = {
    appear: name,
    appearActive: `${name}_active`
  };

  return (
    <CSSTransitionGroup
      {...otherProps}
      className={className}
      transitionName={names}
      transitionAppear={true}
      transitionAppearTimeout={timeout}
      transitionEnter={false}
      transitionLeave={false}
      component={component}
    >
      {children}
    </CSSTransitionGroup>
  );
};

view.displayName = 'transitionGroup--appear';
export { view };