import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import noop from 'lodash/noop';
import { view as Simple } from './simple';
import { view as FloatingLabel } from './floatingLabel';
import { view as Icon } from '../icon/';
import MdArrowDropDown from 'react-icons/lib/md/arrow-drop-down';


let name = 'textFieldBtn';

let init = function() {};

let view = function(props) {
  let {
    // eslint-disable-next-line no-unused-vars
    model, dispatch, dispatcher,
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
      <button  {...otherProps}
        type="button"
        onClick={onClick}
        className="textFieldBtn_btn"
      />
      <Component readOnly value={value}
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
