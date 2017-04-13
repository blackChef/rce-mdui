import React from 'react';
import createComponent from 'rce-pattern/createComponent';


let name = 'radio';

let init = function() {
  return false;
};

let update = function({ type, payload, model, dispatch }) {
  if (type == 'toggle') {
    model.set(payload);
  }
};

let isChecked = event => event.target.checked;

let view = function(props) {
  let { model, dispatch, dispatcher, type, checked, ...otherProps } = props;

  return (
    <div className="radio">
      <input
        {...otherProps}
        type="checkbox"
        checked={model.val()}
        onChange={dispatcher('toggle', isChecked)}
      />
      <div className="radio_appearance"></div>
    </div>
  );
};


view = createComponent({ name, view, update });
export { init, view };