import React from 'react';
import createComponent from 'rce-pattern/createComponent';



let name = 'textField--simple';

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
      <input className="textField_field"
        {...otherProps}
        onChange={onChange}
      />
      <div className="textField_line"></div>
      <div className="textField_hint">{hint}</div>
    </div>
  );
};



view = createComponent({ name, view, update });
export { init, view };