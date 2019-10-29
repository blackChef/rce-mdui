import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { getSlotContent } from '../slot/';
import { view as Popup } from '../popup/';
import './index.scss';

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

  let getContent = getSlotContent(children);
  let title = getContent('title');
  let content = getContent('content');
  let other = getContent('other');
  let actions = getContent('actions').map(function(item) {
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
export default view;
export { init, view };
