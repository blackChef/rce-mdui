import React from 'react';
import curry from 'lodash/curry';

let view = React.createClass({
  displayName: 'Slot',
  render: function() {
    return null;
  },
});


let { toArray } = React.Children;

// did not test with es6 class
let getChildrenWithName = function(children, name) {
  return toArray(children).filter(function(item) {
    let itemName = item.type.displayName ? item.type.displayName : item.type.name;
    return itemName == name;
  });
};

// reactChildren -> bool -> str -> [reacChildren]
let getSlotWithName = curry(function(children, returnFirstSlotChildren, name) {
  let slots = getChildrenWithName(children, 'Slot');
  let match = slots.filter( item => item.props.name == name );
  let ret;
  if (match.length === 0) {

    // read props.children wont throw error
    ret = [{ props: { children: null } }];
  } else {
    ret = match;
  }

  if (returnFirstSlotChildren) {
    return toArray( ret[0].props.children );
  } else {
    return ret;
  }
});

export { view, getSlotWithName };

