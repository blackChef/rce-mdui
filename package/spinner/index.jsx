import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import './index.scss';


let name = 'Spinner';

let init = function() {};

let update = function() {};

let view = function() {
  return (
    <svg className="spinner" viewBox="25 25 50 50">
      <circle className="path" cx="50" cy="50" r="20" fill="none" strokeMiterlimit="10"/>
    </svg>
  );
};


view = createComponent({ name, view, update });
export default view;
export { init, view };
