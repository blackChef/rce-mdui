import React from 'react';
import createComponent from 'rce-pattern/createComponent';

let name = 'toggle';

let init = function() {
  return false;
};

let update = function({ payload, model }) {
  model.set(payload);
};

let view = function(props) {
  let {
    // eslint-disable-next-line no-unused-vars
    model, dispatch, dispatcher,
    ...otherProps
  } = props;

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