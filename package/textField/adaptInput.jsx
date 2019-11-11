import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import omit from 'lodash/omit';
import debounce from 'lodash/debounce';

const isIOS = function() {
  const r1 = /cfnetwork\/.+darwin/i;
  const r2 = /ip[honead]+(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i;
  const isIOS = r1.test(window.navigator.userAgent) || r2.test(window.navigator.userAgent);
  return isIOS;
};

// Chines pinyin ime can be problematic.
// We can't use model as valule directly, because model update is async,
// whitch breaks chinese pinyin ime.

// Reading event.target.value is problematic too.
// Typing "aa" for "啊啊" will receive `event.target.value` like these:
// windows: "a", "a'a", "啊啊";
// ios: "a", "a a", '啊啊', "", "啊啊";
// android: "啊啊"

const createRceInput = function(Input) {
  const name = 'BaseInput';
  const init = function() {
    return '';
  };
  const update = function({ payload, model }) {
    model.set(payload);
  };
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
      this.onChange = (() => {
        const { dispatch } = this.props;
        if (isIOS()) {
          // debounce updating model, fix chinese ime issue on ios
          const updateModel = debounce(value => dispatch('change', value), 100);
          return event => updateModel(event.target.value);
        }
        return event => dispatch('change', event.target.value) ;
      })();
    },
    setRef(r) {
      this.inputDOM = r;
    },
    render() {
      const props = omit(this.props, ['model', 'dispatch', 'dispatcher']);
      return (
        <Input
          {...props}
          ref={this.setRef}
          defaultValue={this.defaultValue}
          onChange={this.onChange}
        />
      );
    },
  });

  view = createComponent({ name, view, update });
  return { init, view };
};

export default createRceInput;