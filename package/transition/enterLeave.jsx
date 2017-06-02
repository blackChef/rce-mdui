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

    // strip out these props
    enterClassName,
    leaveClassName,
    transitionName,
    transitionAppear,
    transitionAppearTimeout,
    transitionEnter,
    transitionLeave,
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
      transitionName={names}
      transitionEnterTimeout={enterTimeout}
      transitionLeaveTimeout={leaveTimeout}
      transitionEnter={!!enterTimeout}
      transitionLeave={!!leaveTimeout}
      className="reactTransitionHelper"
      component={component}
      {...otherProps}
    >
      {children}
    </CSSTransitionGroup>
  );
};

view.displayName = 'transitionGroup--appear';
export { view };