import Transition from './index';
import React from 'react';

const LeaveTransition = function(props) {
  const {
    name,
    activeName = name + '_active',
    duration = 300,
    ...otherProps
  } = props;
  return (
    <Transition
      {...otherProps}
      leaveName={name}
      activeLeaveName={activeName}
      leaveDuration={duration}
    />
  );
};

export default LeaveTransition;
const view = LeaveTransition;
export { view };