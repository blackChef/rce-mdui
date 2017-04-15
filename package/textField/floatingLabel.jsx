import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import setClassNames from 'classnames';


let name = 'textField--floatingLabel';

let init = function() {};

let update = function({ type, payload, model, dispatch }) {};

let view = React.createClass({
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

  isFloating() {
    if (this.props.fixedFloatingLabel) {
      return true;
    }

    else {
      if (this.state.isFocused) {
        return true;
      } else {
        let input = this.refs.input;

        // mounted
        if (input) {
          return input.value !== '';

        // initial render
        } else {
          return this.props.defaultValue !== '';
        };
      }
    }
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
      className: classNameModifier = '',
      ...otherProps
    } = this.props;

    let classNames = setClassNames(`textField textField--floatingLabel ${classNameModifier}`, {
      is_floating: this.isFloating()
    });

    return (
      <div className={classNames}>
        <input className="textField_field"
          {...otherProps}
          ref="input"
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