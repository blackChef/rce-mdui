import React from 'react';
import ReactDOM from 'react-dom';
import createModelHolder from 'rce-pattern/createModelHolder';
import createComponent from 'rce-pattern/createComponent';
import { view as rangeInput } from 'rangeInput/range';
import { view as slider } from 'rangeInput/';

let Test = createModelHolder(rangeInput, { startValue: 80, endValue: 100 });
let Test2 = createModelHolder(slider, 0);

let marks = [
  { value: 30, label: '30%' },
  { value: 50, label: '50%' },
  { value: 90 },
];

ReactDOM.render(
  <Test
    marks={marks}
    step={10}
    className="rangeInput--bubble"
  />,
  document.querySelector('.appContainer')
);