import React from 'react';
import Textarea from 'react-textarea-autosize';

let InputField = function(props) {
  let { autoResize = false, ...otherProps } = props;
  if (autoResize) {
    return <Textarea {...otherProps} style={{ resize: 'none' }}/>;
  } else {
    return <input {...otherProps} />;
  }
};

export default InputField;