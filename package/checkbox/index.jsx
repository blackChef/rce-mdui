import React from 'react';
import createComponent from 'rce-pattern/createComponent';


let name = 'checkbox';

let init = function() {
  return false;
};

let update = function({ type, payload, model, dispatch }) {
  model.set(payload);
};

let isChecked = event => event.target.checked;

let view = function(props) {
  let { model, dispatch, dispatcher, type, checked, ...otherProps } = props;

  return (
    <div className="checkbox">
      <input
        {...otherProps}
        type="checkbox"
        checked={model.val()}
        onChange={dispatcher('toggle', isChecked)}
      />
      <div className="checkbox_appearance"></div>
    </div>
  );
};

view = createComponent({ name, view, update });
export { init, view };
