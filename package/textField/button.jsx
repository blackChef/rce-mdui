import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import createProxyModel from 'rce-pattern/createProxyModel';
import noop from 'lodash/noop';
import { view as NoFloatingLabel } from './noFloatingLabel';
import { view as FloatingLabel } from './floatingLabel';
import { view as Icon } from '../icon/';
import MdArrowDropDown from 'react-icons/lib/md/arrow-drop-down';


const name = 'TextFieldBtn';

const init = function() {};

let view = function(props) {
  const {
    // eslint-disable-next-line no-unused-vars
    model, dispatch, dispatcher,
    className = '',
    value = '',
    floatingLabel = '',
    hint = '',
    onClick = noop,
    disabled,
    ...otherProps
  } = props;

  let Component;
  if (floatingLabel !== '') {
    Component = FloatingLabel;

  } else {
    Component = NoFloatingLabel;
  }

  return (
    <div className={`textFieldBtn ${className} ${disabled ? 'is_disabled' : ''}`}>
      <button  {...otherProps}
        type="button"
        onClick={onClick}
        className="textFieldBtn_btn"
      />
      <Component
        readOnly
        model={createProxyModel(value)}
        floatingLabel={floatingLabel}
        fixedFloatingLabel={true}
        hint={hint}
      />
      <Icon icon={MdArrowDropDown}/>
    </div>
  );
};



view = createComponent({ name, view });
export default view;
export { init, view };
