import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import InputField from './inputField';
import setClassNames from 'classnames';


let name = 'TextField--simple';

let init = function() {};

let update = function({ type, payload, model, dispatch }) {};

let view = function(props) {
  let {
    model,
    dispatch,
    dispatcher,
    hint = '',
    onChange,
    floatingLabel,
    fixedFloatingLabel,
    className = '',
    ...otherProps
  } = props;

  let classNames = setClassNames(`textField ${className}`, {
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
    </div>
  );
};



view = createComponent({ name, view, update });
export { init, view };