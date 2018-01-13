import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import omit from 'lodash/omit';

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
    model,
    dispatcher,
    ...otherProps
  } = props;

  return (
    <div className="checkbox">
      <input
        {...omit(otherProps, ['dispatcher'])}
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
