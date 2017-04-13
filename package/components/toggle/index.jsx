import React from 'react';
import createComponent from 'rce-pattern/createComponent';


let name = 'toggle';

let init = function() {
  return false;
};

let update = function({ type, payload, model, dispatch }) {
  if (type == 'toggle') {
    model.set(payload);
  }
};

let view = function(props) {
  let { model, dispatch, dispatcher, type, checked, ...otherProps } = props;

  return (
    <div className="toggle">
      <input
        {...otherProps}
        type="checkbox"
        checked={model.val()}
        onChange={event => dispatch('toggle', event.target.checked)}
      />
      <div className="toggle_appearance"></div>
    </div>
  );
};


view = createComponent({ name, view, update });
export { init, view };