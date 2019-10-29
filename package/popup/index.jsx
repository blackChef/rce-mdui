import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import RenderInBody from './renderInBody';
import { view as PopupContent, init as popupContentInit } from './popupContent';


const name = 'Popup';

const init = popupContentInit;

let view = function(props) {
  return (
    <RenderInBody>
      <PopupContent {...props}></PopupContent>
    </RenderInBody>
  );
};



view = createComponent({ name, view });
export default view;
export { init, view };
