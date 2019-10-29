import React from 'react';
import createClass from 'create-react-class';
import curry from 'lodash/curry';
import memoize from 'lodash/memoize';

const view = createClass({
  displayName: 'Slot',
  render: function() {
    return null;
  },
});

const toArray = memoize(function(children) {
  return  React.Children.toArray(children);
});

const getChildrenWithName = function(children, name) {
  return toArray(children).filter(function(item) {
    const itemName = item.type.displayName ? item.type.displayName : item.type.name;
    return itemName === name;
  });
};

const getSlots = curry(function(children, name) {
  return getChildrenWithName(children, 'Slot')
    .filter(i => i.props.name === name);
});

const getSlot = curry(function(children, name) {
  const slots = getSlots(children, name);

  // read props won't throw error
  if (slots[0] === undefined) {
    return { props: {} };
  }

  return slots[0];
});

const getSlotContent = curry(function(children, name) {
  const slots = getSlots(children, name);

  if (slots.length === 0) {
    return [];
  }

  return toArray(slots[0].props.children);
});


export { view, getSlots, getSlot, getSlotContent };

