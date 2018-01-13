import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import noop from 'lodash/noop';
import { view as Simple } from './simple';
import { view as FloatingLabel } from './floatingLabel';
import { view as Icon } from '../icon/';
import MdArrowDropDown from 'react-icons/lib/md/arrow-drop-down';
import omit from 'lodash/omit';


let name = 'textFieldBtn';

let init = function() {};

let view = function(props) {
  let {
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
      <button  {...omit(otherProps, ['model', 'dispatch', 'dispatcher'])}
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
export { init, view };