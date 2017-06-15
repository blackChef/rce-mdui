import React from 'react';
import createClass from 'create-react-class';
import Textarea from 'react-textarea-autosize';
import addESCListener from '../utils/escState';
import noop from 'lodash/noop';

let InputField = createClass({
  onFocus(event) {
    let { onFocus = noop } = this.props;
    onFocus(event);

    let inputDOM = event.target;
    this.removeESCListener = addESCListener(() => inputDOM.blur());
  },

  onBlur(event) {
    let { onBlur = noop } = this.props;
    onBlur(event);

    this.removeESCListener !== undefined && this.removeESCListener();
  },

  render() {
    let { autoResize = false, ...otherProps } = this.props;

    if (autoResize) {
      return (
        <Textarea {...otherProps}
          style={{ resize: 'none' }}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      );
    }

    return (
      <input {...otherProps}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    );
  },
});

export default InputField;