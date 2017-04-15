import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { getSlotWithName } from '../slot/';
import proxyModel from 'rce-pattern/createProxyModel';
import includes from 'lodash/includes';
import { view as Checkbox, init as checkboxInit } from '../checkbox/';


let name = 'CheckboxGroup';

let init = function(type = 'multiple') {
  return type === 'multiple' ?
    [/* selected item's id */] :
    null; // selected item's id
};

let update = function({ type, payload, model, dispatch }) {
  let { id, isChecked } = payload;

  if (type === 'toggle_multiple') {
    if (!isChecked) {
      model.set(
        model.val().filter(i => i.id === id)
      );
    } else {
      model.set( model.val().concat([id]) );
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
      includes(model.val(), id) :
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
    dispatcher,
    children,
    type = 'multiple',
    containerComponent = <Div />
  } = props;

  let items = getSlotWithName(children, false, 'item')
    .map(function(item, index) {
      let { children, id = index } = item.props;
      let checkbox = renderCheckbox(dispatch, type, model, id);
      return React.cloneElement(children, { checkbox, key: id });
    });

  return React.cloneElement(containerComponent, { children: items });
};

view = createComponent({ name, view, update });
export { init, view };