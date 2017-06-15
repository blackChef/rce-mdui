import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import setClassNames from 'classnames';
import InputField from './inputField';



let name = 'TextField--floatingLabel';

let init = function() {};

let update = function({ type, payload, model, dispatch }) {};

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
    this.input = this.refs.main.querySelector('.textField_field');
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
    let {
      model,
      dispatch,
      dispatcher,
      hint = '',
      floatingLabel = '',
      fixedFloatingLabel = false,
      onChange,
      placeholder,
      className = '',
      ...otherProps
    } = this.props;

    let classNames = setClassNames(`textField textField--floatingLabel ${className}`, {
      is_floating: this.isFloating()
    });

    return (
      <div className={classNames} ref="main">
        <InputField
          {...otherProps}
          className="textField_field"
          onChange={onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />

        <div className="textField_line"></div>
        <label className="textField_floatingLabel">{floatingLabel}</label>
        <div className="textField_hint">{hint}</div>
     </div>
    );
  },
});




view = createComponent({ name, view, update });
export { init, view };