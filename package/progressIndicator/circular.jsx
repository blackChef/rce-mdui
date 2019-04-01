import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import './circular.scss';


let name = 'circularProgress';

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
export { init, view };