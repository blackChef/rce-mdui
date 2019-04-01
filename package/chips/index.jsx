import React from 'react';
import Select from 'react-select';
import createComponent from 'rce-pattern/createComponent';
import './index.scss';

let name = 'chips';

let init = function() {
  return []; // selected option value
};

let update = function({ payload, model }) {
  let selectedItems = Array.isArray(payload)? payload : [payload];
  let newModel = selectedItems.map(item => item.value);
  model.set(newModel);
};

let getSeletectVal = function(model, options, multi) {
  let val = model.val() || [];
  if (val.length) {
    let ret = val.map(function(value) {
      let { label } = options.find(i => i.value === value);
      return { value, label };
    });

    return multi ? ret : ret[0];
  }
};

let view = function(props) {
  let {
    // eslint-disable-next-line no-unused-vars
    model, dispatch, dispatcher,
    multi = true,
    placeholder = '请选择',
    searchable = false,
    clearable = false, // don't show clear button
    options, // [{ label, value }]
    ...otherProps
  } = props;

  let selectedValue = getSeletectVal(model, options, multi);

  return (
    <Select
      {...otherProps}
      backspaceToRemoveMessage={''}
      placeholder={placeholder}
      searchable={searchable}
      clearable={clearable}
      multi={multi}
      value={selectedValue}
      autoBlur={true}
      options={options}
      onChange={selectedItems => dispatch('change', selectedItems)}
    />
  );
};

view = createComponent({ name, view, update, cursorProps: ['options'] });
export { init, view };

