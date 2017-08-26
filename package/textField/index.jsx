import React from 'react';
import createClass from 'create-react-class';
import { findDOMNode } from 'react-dom';
import createComponent from 'rce-pattern/createComponent';
import { view as FloatingLabel } from './floatingLabel';
import { view as Simple } from './simple';
import debounce from 'lodash/debounce';


let name = 'TextField';

let init = function() {
  return '';
};

let update = function({ type, payload, model, dispatch }) {
  model.set(payload);
};


// Chines pinyin ime can be problematic.
// We can't use model as valule directly, because model update is async,
// break chinese pinyin ime.

// Reading event.target.value is problematic too.
// Typing "aa" for "啊啊" will receive `event.target.value` like these:
// windows: "a", "a'a", "啊啊";
// ios: "a", "a a", '啊啊', "", "啊啊";
// android: "啊啊"

let view = createClass({
  componentWillReceiveProps(nextProps) {
    let nextModelVal = nextProps.model.val();
    let domValue = this.inputDOM.value;

    if (nextModelVal !== domValue) {
      this.inputDOM.value = nextModelVal;
    }
  },

  componentWillMount() {
    this.defaultValue = this.props.model.val();

    // debounce updating model, so no chinese ime issue on ios
    let updateModel = debounce(value => {
      this.props.dispatch('change', value);
    }, 100);

    this.onChange = function(event) {
      updateModel(event.target.value);
    };
  },

  componentDidMount() {
    let main = findDOMNode(this.refs.main);
    this.inputDOM = main.querySelector('.textField_field');
  },

  render() {
    let {
      model,
      dispatch,
      dispatcher,
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
        defaultValue={this.defaultValue}
        onChange={this.onChange}
      />
    );
  },
});


view = createComponent({ name, view, update });
export { init, view };