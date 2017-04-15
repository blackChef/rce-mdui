import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { getSlotWithName } from '../slot/';
import { view as Popup } from '../popup/';

let name = 'Dialog';

let init = function() {
  return false;
};

let Front = function(props) {
  let {
    children,
    tryToClose,
    forceOpen
  } = props;

  let getSlot = getSlotWithName(children, true);
  let title = getSlot('title');
  let content = getSlot('content');
  let other = getSlot('other');
  let actions = getSlot('actions').map(function(item) {
    return React.cloneElement(item, {
      tryToClose,
      forceOpen,
    });
  });

  return (
    <div className="dialog_front">
      <div className="dialog_title">{title}</div>
      <div className="dialog_contentWrapper">
        <div className="dialog_content">
          {content}
        </div>
      </div>

      <div className="dialog_actions">
        {actions}
      </div>

      {other}
    </div>
  );
};

let view = function(props) {
  let {
    model,
    className = '',
    ...otherProps
  } = props;

  return (
    <Popup
      {...otherProps}
      className={`dialog ${className}`}
      model={model}
      openAnimationDuration={300}
      closeAnimationDuration={300}
      bgProps={{ className: 'dialog_background' }}
    >
      <Front {...props}/>
    </Popup>
  );
};

view = createComponent({ name, view });
export { init, view };