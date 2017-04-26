import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import InputField from './inputField';


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
    className: classNameModifier = '',
    ...otherProps
  } = props;

  return (
    <div className={`textField ${classNameModifier}`}>
      <InputField
        {...otherProps}
        className="textField_field"
        onChange={onChange}
      />
      <div className="textField_line"></div>
      <div className="textField_hint">{hint}</div>
    </div>
  );
};



view = createComponent({ name, view, update });
export { init, view };