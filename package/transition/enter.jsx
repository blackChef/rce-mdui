import Transition from './index';
import React from 'react';

const EnterTransition = function(props) {
  const {
    name,
    activeName = name + '_active',
    duration = 300,
    ...otherProps
  } = props;
  return (
    <Transition
      {...otherProps}
      enterName={name}
      activeEnterName={activeName}
      enterDuration={duration}
    />
  );
};

export default EnterTransition;
const view = EnterTransition;
export { view };