import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import proxyModel from 'rce-pattern/createProxyModel';
import cRemove from 'rce-pattern/array/remove';
import cPush from 'rce-pattern/array/push';
import { getSlots } from '../slot/';
import { view as Checkbox } from '../checkbox/';


let name = 'CheckboxGroup';

let init = function(type = 'multiple') {
  return type === 'multiple' ?
    [/* selected item's id */] :
    null; // selected item's id
};

let update = function({ type, payload, model }) {
  let { id, isChecked } = payload;
  if (type === 'toggle_multiple') {
    if (!isChecked) {
      cRemove(model, i => i === id);
    } else {
      cPush(model, id);
    }
  }

  else {
    if (!isChecked) {
      model.set(null);
    } else {
      model.set(id);
    }
  }
};

let renderCheckbox = function(dispatch, type, model, id) {
  let isChecked = function() {
    return type === 'multiple' ?
      model.val().includes(id) :
      model.val() === id;
  };

  let toggle = function(isChecked) {
    dispatch(`toggle_${type}`, { id, isChecked });
  };

  return <Checkbox model={proxyModel(isChecked, toggle)} />;
};


let view = function(props) {
  let {
    model,
    dispatch,
    children,
    type = 'multiple',
    containerComponent = <div />
  } = props;

  let items = getSlots(children, 'item')
    .map(function(item, index) {
      let { children, id = index } = item.props;
      let checkbox = renderCheckbox(dispatch, type, model, id);
      return React.cloneElement(children, { checkbox, key: id });
    });

  return React.cloneElement(containerComponent, { children: items });
};

view = createComponent({ name, view, update });
export default view;
export { init, view };
