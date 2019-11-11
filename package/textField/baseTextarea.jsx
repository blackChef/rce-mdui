import React from 'react';
import adaptInput from './adaptInput';

const Textarea = React.forwardRef(function(props, ref) {
  return <textarea {...props} ref={ref}/>;
});

const { init, view } = adaptInput(Textarea);

export default view;
export { init, view };