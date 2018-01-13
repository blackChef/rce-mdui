import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

let view = function(props) {
  let {
    children,
    enterName = '',
    leaveName = '',
    enterTimeout = 0,
    leaveTimeout = 0,
    component = 'div',
    className = 'reactTransitionHelper',
    ...otherProps
  } = props;

  let names = {
    enter: enterName,
    enterActive: `${enterName}_active`,
    leave: leaveName,
    leaveActive: `${leaveName}_active`,
  };

  return (
    <CSSTransitionGroup
      {...otherProps}
      transitionName={names}
      transitionEnterTimeout={enterTimeout}
      transitionLeaveTimeout={leaveTimeout}
      transitionEnter={!!enterTimeout}
      transitionLeave={!!leaveTimeout}
      className={className}
      component={component}
    >
      {children}
    </CSSTransitionGroup>
  );
};

view.displayName = 'transitionGroup--appear';
export { view };