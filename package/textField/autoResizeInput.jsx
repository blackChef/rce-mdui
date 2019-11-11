import Textarea from 'react-textarea-autosize';
import React from 'react';
import adaptInput from './adaptInput';

const AutoResizeInput = React.forwardRef(function(props, ref) {
  return <Textarea {...props} ref={ref}/>;
});

const { init, view } = adaptInput(AutoResizeInput);

export default view;
export { init, view };