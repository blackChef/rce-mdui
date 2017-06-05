import React from 'react';
import curry from 'lodash/curry';

let view = React.createClass({
  displayName: 'Slot',
  render: function() {
    return null;
  },
});


let { toArray } = React.Children;

let getChildrenWithName = function(children, name) {
  return toArray(children).filter(function(item) {
    let itemName = item.type.displayName ? item.type.displayName : item.type.name;
    return itemName == name;
  });
};

let getSlots = curry(function(children, name) {
  return getChildrenWithName(children, 'Slot')
    .filter(i => i.props.name === name);
});

let getSlot = curry(function(children, name) {
  let slots = getSlots(children, name);

  // read props won't throw error
  if (slots[0] === undefined) {
    return { props: {} };
  }

  return slots[0];
});

let getSlotContent = curry(function(children, name) {
  let slots = getSlots(children, name);

  if (slots.length === 0) {
    return [];
  }

  return toArray(slots[0].props.children);
});


export { view, getSlots, getSlot, getSlotContent };

