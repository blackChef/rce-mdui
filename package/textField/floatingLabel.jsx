import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import setClassNames from 'classnames';
import InputField from './inputField';
import { view as ClearBtn } from './clearBtn';


const name = 'TextField--floatingLabel';

const init = function() {};

let view = createClass({
  getInitialState() {
    return {
      isFocused: false,
    };
  },
  onFocus() {
    this.setState({ isFocused: true });
  },
  onBlur() {
    this.setState({ isFocused: false });
  },
  componentDidMount() {
    this.input = this.mainRef.querySelector('.textField_field');
  },
  isFloating() {
    if (this.props.fixedFloatingLabel) {
      return true;
    }

    if (this.state.isFocused) {
      return true;
    }

    // mounted
    if (this.input) {
      return this.input.value !== '';
    }

    // initial render
    return this.props.defaultValue !== '';
  },
  render() {
    const {
      hint = '',
      floatingLabel = '',
      onChange,
      className = '',
      // eslint-disable-next-line no-unused-vars
      fixedFloatingLabel,
      shouldShowClearButton = false,
      ...otherProps
    } = this.props;

    const classNames = setClassNames(`textField textField--floatingLabel ${className}`, {
      is_floating: this.isFloating(),
      is_readOnly: otherProps.readOnly,
      is_disabled: otherProps.disabled,
    });

    return (
      <div className={classNames} ref={e => this.mainRef = e}>
        <InputField
          {...otherProps}
          className="textField_field"
          onChange={onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />

        <div className="textField_line"></div>
        <label className="textField_floatingLabel">{floatingLabel}</label>
        {hint && <div className="textField_hint">{hint}</div>}
        {
          shouldShowClearButton &&
          <ClearBtn {...otherProps}/>
        }
     </div>
    );
  },
});




view = createComponent({ name, view });
export default view;
export { init, view };
