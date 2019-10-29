import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { getSlot, getSlotContent } from '../slot/';
import { view as ContextualBar } from '../contextualBar';
import './index.scss';

let name = 'AppBar';

let init = function() {};

let renderContextualBar = function(appBarChildren) {
  let slot = getSlot(appBarChildren, 'contextualBar');
  return (
    <ContextualBar {...slot.props}/>
  );
};


let view = function({ children, className = '' }) {
  let getContent = getSlotContent(children);
  let navButton = getContent('navButton');
  let title = getContent('title');
  let actions = getContent('actions').map(function(item, index) {
    return (
      <div
        key={index}
        className="actionBar_actions_item"
      >
        {item}
      </div>
    );
  });
  let otherContent = getContent('other');

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



view = createComponent({ name, view });
export default view;
export { init, view };
