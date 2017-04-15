import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import noop from 'lodash/noop';
import { view as Simple } from './simple';
import { view as FloatingLabel } from './floatingLabel';


let name = 'textFieldBtn';

let init = function() {};

let update = function({ type, payload, model, dispatch }) {};

let view = function(props) {
  let {
    model,
    dispatch,
    dispatcher,
    className = '',
    value = '',
    floatingLabel = '',
    hint = '',
    onClick = noop,
    ...otherProps
  } = props;

  let Component;
  if (floatingLabel !== '') {
    Component = FloatingLabel;

  } else {
    Component = Simple;
  }

  return (
    <div className="textFieldBtn">
      <button type="button" {...otherProps} onClick={onClick} className="textFieldBtn_btn" />
      <Component readOnly value={value}
        className={className}
        floatingLabel={floatingLabel}
        fixedFloatingLabel={true}
        hint={hint}
      />
    </div>
  );
};



view = createComponent({ name, view, update });
export { init, view };