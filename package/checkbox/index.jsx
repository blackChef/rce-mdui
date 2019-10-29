import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import './index.scss';


let name = 'checkbox';

let init = function() {
  return false;
};

let update = function({ payload, model }) {
  model.set(payload);
};

let isChecked = event => event.target.checked;

let view = function(props) {
  let {
    // eslint-disable-next-line no-unused-vars
    model, dispatcher, dispatch,
    style = "checkbox",
    ...otherProps
  } = props;

  return (
    <div className={style}>
      <input
        {...otherProps}
        type="checkbox"
        checked={model.val()}
        onChange={dispatcher('toggle', isChecked)}
      />
      <div className={`${style}_appearance`}></div>
    </div>
  );
};

view = createComponent({ name, view, update });
export default view;
export { init, view };

