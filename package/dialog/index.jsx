import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { getSlotContent } from '../slot/';
import { view as Popup } from '../popup/';
import './index.scss';

const name = 'Dialog';

const init = function() {
  return false;
};

const Front = function(props) {
  const {
    children,
    tryToClose,
    forceOpen
  } = props;

  const getContent = getSlotContent(children);
  const title = getContent('title');
  const content = getContent('content');
  const other = getContent('other');
  const actions = getContent('actions').map(function(item) {
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
  const {
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
