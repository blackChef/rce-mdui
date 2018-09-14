import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import createClass from 'create-react-class';
import { view as IconButton } from '../buttons/iconButton';
import ClearIcon from 'react-icons/lib/md/clear';

let name = 'ClearBtn';

let init = function() {};

let view = createClass({
  clearContent(event) {
    event.preventDefault();
    // let wrapperElem = event.target.closest('.textField');
    // let inputElem = wrapperElem.querySelector('input') || wrapperElem.querySelector('textarea');
    this.props.model.set('');
  },
  render() {
    let { readOnly, disabled, model } = this.props;
    if (readOnly || disabled || model.val() === '') {
      return null;
    }
    return (
      <IconButton
        onMouseDown={this.clearContent}
        icon={ClearIcon}
        className="textField_clearBtn"
      />
    );
  },
});


view = createComponent({ name, view });
export { init, view };