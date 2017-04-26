import React from 'react';
import ReactDOM from 'react-dom';
import createModelHolder from 'rce-pattern/createModelHolder';
import createComponent from 'rce-pattern/createComponent';
import { view as textArea } from 'textField/';

let Test = createModelHolder(textArea, '');


ReactDOM.render(
  <Test floatingLabel="test" autoResize={true}/>,
  document.querySelector('.appContainer')
);