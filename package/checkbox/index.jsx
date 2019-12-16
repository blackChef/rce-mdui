import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import './index.scss';


const name = 'checkbox';

const init = function() {
  return false;
};

const update = function({ payload, model }) {
  model.set(payload);
};

const isChecked = event => event.target.checked;

let view = function(props) {
  const {
    // eslint-disable-next-line no-unused-vars
    model, dispatch, dispatcher,
    style = "checkbox",
    ...otherProps
  } = props;

  return (
    <div className={style}>
      <input
        {...otherProps}
        type="checkbox"
        checked={model.val()}
        onChange={e => dispatch('toggle', isChecked(e))}
      />
      <div className={`${style}_appearance`}></div>
    </div>
  );
};

view = createComponent({ name, view, update });
export default view;
export { init, view };

