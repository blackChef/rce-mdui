import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import noop from 'lodash/noop';
import { view as Simple } from './simple';
import { view as FloatingLabel } from './floatingLabel';
import { view as Icon } from '../icon/';


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
    <div className={`textFieldBtn ${className}`}>
      <button type="button" {...otherProps} onClick={onClick} className="textFieldBtn_btn" />
      <Component readOnly value={value}
        floatingLabel={floatingLabel}
        fixedFloatingLabel={true}
        hint={hint}
      />
      <Icon icon="arrow_drop_down"/>
    </div>
  );
};



view = createComponent({ name, view, update });
export { init, view };