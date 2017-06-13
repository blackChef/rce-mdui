import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { getSlotContent } from '../slot/';
import setClassNames from 'classnames';
import { view as IconButton } from '../buttons/iconButton';
import { view as Icon } from '../icon/';


let name = 'ContextualBar';

let init = function() {};

let update = function({ type, payload, model, dispatch }) {};

let renderActionItem = function(item, index) {
  return <div key={index} className="contextualBar_actions_item">{item}</div>;
};

let renderActionsForSingleItem = function(count, children) {
  if (count == 1) {
    let slots = getSlotContent(children, 'single');

    return (
      <div className="contextualBar_actions_single">
        {slots.map(renderActionItem)}
      </div>
    );
  }
};

let renderActionsForMultipleItems = function(count, children) {
  if (count > 0) {
    let slots = getSlotContent(children, 'multiple');

    return (
      <div className="contextualBar_actions_multiple">
        {slots.map(renderActionItem)}
      </div>
    );
  }
};

let view = function({ model, dispatch, children, count, onRequestDeselectAll }) {
  let className = setClassNames('contextualBar', {
    'is_active': count > 0,
  });

  return (
    <div className={className}>
      <div className="contextualBar_control">
        <IconButton
          className="contextualBar_control_closeButton iconButton--white"
          icon="close"
          onClick={ onRequestDeselectAll }
        />

        <div className="contextualBar_control_count">
          <div className="contextualBar_control_count_prefix">已选择</div>
          {count}
          <div className="contextualBar_control_count_suffix">项</div>
        </div>
      </div>

      <div className="contextualBar_actions">
        { renderActionsForMultipleItems(count, children) }
        { renderActionsForSingleItem(count, children) }
      </div>
    </div>
  );
};

view = createComponent({ name, view, update });
export { init, view };