import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import createClass from 'create-react-class';
import InputField from './inputField';
import setClassNames from 'classnames';
import { view as ClearBtn } from './clearBtn';


let name = 'TextField--simple';

let init = function() {};

let view = createClass({
  render() {
    let {
      hint = '',
      onChange,
      className = '',
      // eslint-disable-next-line no-unused-vars
      floatingLabel, fixedFloatingLabel,
      shouldShowClearButton = false,
      ...otherProps
    } = this.props;

    let classNames = setClassNames(`textField textField--simple ${className}`, {
      is_readOnly: otherProps.readOnly,
      is_disabled: otherProps.disabled,
    });

    return (
      <div className={classNames}>
        <InputField
          {...otherProps}
          className="textField_field"
          onChange={onChange}
        />
        <div className="textField_line"></div>
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
export { init, view };