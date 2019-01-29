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

let update = function({ payload, model }) {
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

    let onChange = (() => {
      let { dispatch} = this.props;

      let r1 = /cfnetwork\/.+darwin/i;
      let r2 = /ip[honead]+(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i;
      let isIOS = r1.test(window.navigator.userAgent) || r2.test(window.navigator.userAgent);

      if (isIOS) {
        // debounce updating model, so no chinese ime issue on ios
        let updateModel = debounce(value => {
          dispatch('change', value);
        }, 100);

        return function(event) {
          updateModel(event.target.value);
        };
      }

      return function(event) {
        dispatch('change', event.target.value);
      };
    })();

    this.onChange = onChange;
  },

  componentDidMount() {
    let main = findDOMNode(this.mainRef);
    this.inputDOM = main.querySelector('.textField_field');
  },

  render() {
    let {
      floatingLabel = '',
      fixedFloatingLabel = false,
      hint = '',
      ...otherProps
    } = this.props;

    let Component = floatingLabel === '' ? Simple : FloatingLabel;
    let componentProps = floatingLabel === '' ?
      { hint } : { hint, floatingLabel, fixedFloatingLabel };

    return (
      <Component
        {...otherProps}
        {...componentProps}
        ref={e => this.mainRef = e}
        defaultValue={this.defaultValue}
        onChange={this.onChange}
      />
    );
  },
});


view = createComponent({ name, view, update });
export { init, view };