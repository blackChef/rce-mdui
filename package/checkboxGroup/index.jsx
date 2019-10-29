import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import proxyModel from 'rce-pattern/createProxyModel';
import cRemove from 'rce-pattern/array/remove';
import cPush from 'rce-pattern/array/push';
import { getSlots } from '../slot/';
import { view as Checkbox } from '../checkbox/';


const name = 'CheckboxGroup';

const init = function(type = 'multiple') {
  return type === 'multiple' ?
    [/* selected item's id */] :
    null; // selected item's id
};

const update = function({ type, payload, model }) {
  const { id, isChecked } = payload;
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

const renderCheckbox = function(dispatch, type, model, id) {
  const isChecked = function() {
    return type === 'multiple' ?
      model.val().includes(id) :
      model.val() === id;
  };

  const toggle = function(isChecked) {
    dispatch(`toggle_${type}`, { id, isChecked });
  };

  return <Checkbox model={proxyModel(isChecked, toggle)} />;
};


let view = function(props) {
  const {
    model,
    dispatch,
    children,
    type = 'multiple',
    containerComponent = <div />
  } = props;

  const items = getSlots(children, 'item')
    .map(function(item, index) {
      const { children, id = index } = item.props;
      const checkbox = renderCheckbox(dispatch, type, model, id);
      return React.cloneElement(children, { checkbox, key: id });
    });

  return React.cloneElement(containerComponent, { children: items });
};

view = createComponent({ name, view, update });
export default view;
export { init, view };
