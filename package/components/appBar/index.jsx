import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { view as Slot, getSlotWithName } from '../slot/';
import { view as ContextualBar } from '../contextualBar';

let name = 'AppBar';

let init = function() {};

let update = function({ type, payload, model, dispatch }) {};

let renderContextualBar = function(appBarChildren) {
  let slot = getSlotWithName(appBarChildren, false, 'contextualBar')[0];

  if (!slot.props.children) return;

  return (
    <ContextualBar {...slot.props}/>
  );
};


let view = function({ children, className = '' }) {
  let getSlot = getSlotWithName(children, true);
  let navButton = getSlot('navButton');
  let title = getSlot('title');
  let actions = getSlot('actions').map(function(item, index) {
    return (
      <div
        key={index}
        className="actionBar_actions_item"
      >
        {item}
      </div>
    );
  });
  let otherContent = getSlot('other');

  return (
    <header className={`appBar ${className}`}>
      <div className="actionBar">
        <div className="actionBar_navButton">
          {navButton}
        </div>

        <div className="actionBar_title">
          {title}
        </div>

        <div className="actionBar_actions">
          {actions}
        </div>
      </div>

      {renderContextualBar(children)}
      {otherContent}
    </header>
  );
};



view = createComponent({ name, view, update });
export { init, view };