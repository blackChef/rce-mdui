import React from 'react';
import Select from 'react-select';
import createComponent from 'rce-pattern/createComponent';
import './index.scss';

const name = 'chips';

const init = function() {
  return []; // selected option value
};

const update = function({ payload, model }) {
  const selectedItems = Array.isArray(payload)? payload : [payload];
  const newModel = selectedItems.map(item => item.value);
  model.set(newModel);
};

const getSeletectVal = function(model, options, multi) {
  const val = model.val() || [];
  if (val.length) {
    const ret = val.map(function(value) {
      const { label } = options.find(i => i.value === value);
      return { value, label };
    });

    return multi ? ret : ret[0];
  }
};

let view = function(props) {
  const {
    // eslint-disable-next-line no-unused-vars
    model, dispatch, dispatcher,
    multi = true,
    placeholder = '请选择',
    searchable = false,
    clearable = false, // don't show clear button
    options, // [{ label, value }]
    ...otherProps
  } = props;

  const selectedValue = getSeletectVal(model, options, multi);

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
export default view;
export { init, view };


