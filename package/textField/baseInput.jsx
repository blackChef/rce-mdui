import React from 'react';
import adaptInput from './adaptInput';

const Input = React.forwardRef(function(props, ref) {
  return <input {...props} ref={ref}/>;
});

const { init, view } = adaptInput(Input);

export default view;
export { init, view };