import React from 'react';
import createClass from 'create-react-class';
import addESCListener from '../utils/escState';
import noop from 'lodash/noop';
import BaseInput from './baseInput';
import AutoResizeInput from './autoResizeInput';

const InputField = createClass({
  onFocus(event) {
    const { onFocus = noop } = this.props;
    onFocus(event);
    const inputDOM = event.target;
    this.removeESCListener = addESCListener(() => inputDOM.blur());
  },

  onBlur(event) {
    const { onBlur = noop } = this.props;
    onBlur(event);
    this.tryRemoveESCListener();
  },

  tryRemoveESCListener() {
    this.removeESCListener !== undefined && this.removeESCListener();
  },

  componentWillUnmount() {
    this.tryRemoveESCListener();
  },

  render() {
    const {
      // eslint-disable-next-line no-unused-vars
      model, dispatch, dispatcher,
      autoResize = false,
      ...otherProps
    } = this.props;

    if (autoResize) {
      return (
        <AutoResizeInput
          {...otherProps}
          model={model}
          style={{ resize: 'none' }}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      );
    }

    return (
      <BaseInput
        {...otherProps}
        model={model}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    );
  },
});

export default InputField;