import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import createClass from 'create-react-class';
import InputField from './inputField';
import setClassNames from 'classnames';
import { view as ClearBtn } from './clearBtn';


const name = 'TextField--simple';

const init = function() {};

let view = createClass({
  render() {
    const {
      hint = '',
      onChange,
      className = '',
      // eslint-disable-next-line no-unused-vars
      floatingLabel, fixedFloatingLabel,
      shouldShowClearButton = false,
      ...otherProps
    } = this.props;

    const classNames = setClassNames(`textField textField--simple ${className}`, {
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
export default view;
export { init, view };
