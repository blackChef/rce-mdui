import React from 'react';
import createClass from 'create-react-class';
import { findDOMNode } from 'react-dom';
import createComponent from 'rce-pattern/createComponent';
import { view as FloatingLabel } from './floatingLabel';
import { view as Simple } from './simple';
import debounce from 'lodash/debounce';
import './index.scss';


const name = 'TextField';

const init = function() {
  return '';
};

const update = function({ payload, model }) {
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
  UNSAFE_componentWillReceiveProps(nextProps) {
    const nextModelVal = nextProps.model.val();
    const domValue = this.inputDOM.value;

    if (nextModelVal !== domValue) {
      this.inputDOM.value = nextModelVal;
    }
  },

  UNSAFE_componentWillMount() {
    this.defaultValue = this.props.model.val();

    const onChange = (() => {
      const { dispatch} = this.props;

      const r1 = /cfnetwork\/.+darwin/i;
      const r2 = /ip[honead]+(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i;
      const isIOS = r1.test(window.navigator.userAgent) || r2.test(window.navigator.userAgent);

      if (isIOS) {
        // debounce updating model, so no chinese ime issue on ios
        const updateModel = debounce(value => {
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
    const main = findDOMNode(this.mainRef);
    this.inputDOM = main.querySelector('.textField_field');
  },

  render() {
    const {
      floatingLabel = '',
      fixedFloatingLabel = false,
      hint = '',
      ...otherProps
    } = this.props;

    const Component = floatingLabel === '' ? Simple : FloatingLabel;
    const componentProps = floatingLabel === '' ?
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
export default view;
export { init, view };
