import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import './index.scss';

const name = 'toggle';

const init = function() {
  return false;
};

const update = function({ payload: [newState, onChange], model }) {
  model.set(newState);
  onChange && onChange(newState);
};

let view = function(props) {
  const {
    // eslint-disable-next-line no-unused-vars
    model, dispatch, dispatcher, onChange,
    ...otherProps
  } = props;

  return (
    <div className="toggle">
      <input
        {...otherProps}
        type="checkbox"
        checked={model.val()}
        onChange={event => dispatch('toggle', [event.target.checked, onChange])}
      />
      <div className="toggle_appearance"></div>
    </div>
  );
};


view = createComponent({ name, view, update });
export default view;
export { init, view };
