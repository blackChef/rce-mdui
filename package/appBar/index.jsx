import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { getSlot, getSlotContent } from '../slot/';
import { view as ContextualBar } from '../contextualBar';
import './index.scss';

const name = 'AppBar';

const init = function() {};

const renderContextualBar = function(appBarChildren) {
  const slot = getSlot(appBarChildren, 'contextualBar');
  return (
    <ContextualBar {...slot.props}/>
  );
};


let view = function({ children, className = '' }) {
  const getContent = getSlotContent(children);
  const navButton = getContent('navButton');
  const title = getContent('title');
  const actions = getContent('actions').map(function(item, index) {
    return (
      <div
        key={index}
        className="actionBar_actions_item"
      >
        {item}
      </div>
    );
  });
  const otherContent = getContent('other');

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
