import React from 'react';
import { findDOMNode } from 'react-dom';
import createComponent from 'rce-pattern/createComponent';
import { view as FloatingLabel } from './floatingLabel';
import { view as Simple } from './simple';
import throttle from 'lodash/throttle';

let name = 'textField';

let init = function() {
  return '';
};

let update = function({ type, payload, model, dispatch }) {
  model.set(payload);
};


/**
 * https://segmentfault.com/q/1010000003974633
 * Model update is async, breaks chinese pinyin ime.
 * Here we are using uncontrolled input,
 * but still let consumer control input through model
 */

let view = React.createClass({
  componentWillReceiveProps(nextProps) {
    let newValue = nextProps.model.val();
    let oldValue = this.input.value;

    if (newValue !== oldValue) {
      this.input.value = newValue;
    }
  },

  componentWillMount() {
    let modelVal = this.props.model.val();
    this.initialValue = (!modelVal && modelVal !== 0)? init() : modelVal;
  },

  componentDidMount() {
    let main = findDOMNode(this.refs.main);
    this.input = main.querySelector('input');
    // input.addEventListener('focusin', function(event) {
    //   setTimeout(function() {
    //     event.target.scrollIntoViewIfNeeded();
    //   }, 300);
    // }, false);
  },

  render() {
    let {
      model,
      dispatch,
      dispatcher,
      name = 'emptyTextField',
      floatingLabel = '',
      fixedFloatingLabel = false,
      hint = '',
      onChange,
      value,
      ...otherProps
    } = this.props;


    let Component = floatingLabel === '' ? Simple : FloatingLabel;

    return (
      <Component
        {...otherProps}
        ref="main"
        floatingLabel={floatingLabel}
        fixedFloatingLabel={fixedFloatingLabel}
        hint={hint}
        name={name}
        defaultValue={this.initialValue}
        onChange={event => dispatch('change', event.target.value)}

      />
    );
  },
});


view = createComponent({ name, view, update });
export { init, view };