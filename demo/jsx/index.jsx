import React from 'react';
import ReactDOM from 'react-dom';
import createModelHolder from 'rce-pattern/createModelHolder';
import createComponent from 'rce-pattern/createComponent';
import { view as rangeInput } from 'rangeInput/';

let Test = createModelHolder(rangeInput, 0);

let marks = [
  { value: 30 },
  { value: 50 },
  { value: 90 },
];

ReactDOM.render(
  <Test marks={marks}/>,
  document.querySelector('.appContainer')
);