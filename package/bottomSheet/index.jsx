import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { getSlotContent } from '../slot/';
import { view as Popup } from '../popup/';

let name = 'BottomSheet';

let init = function() {
  return {
    show: false
  };
};

let update = function({ type, payload, model, dispatch }) {};


let Front = function(props) {
  let {
    children,
    forceOpen,
    tryToClose,
    navButtonIcon = 'close'
  } = props;

  return (
    <div className="bottomSheet_front">
      <div className="bottomSheet_front_body">
        {children}
      </div>
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
      className={`bottomSheet ${className}`}
      model={model.show}
      openAnimationDuration={300}
      closeAnimationDuration={300}
      bgProps={{ className: 'bottomSheet_background' }}
    >
      <Front {...props} />
    </Popup>
  );
};



view = createComponent({ name, view, update });
export { init, view };