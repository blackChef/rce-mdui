import React from 'react';
import ReactDOM from 'react-dom';
import createModelHolder from 'rce-pattern/createModelHolder';
import createComponent from 'rce-pattern/createComponent';
import { view as Input } from 'textField/';


let T = React.createClass({
  onChange(event) {
    let { value } = event.target;
    console.log('event', value);
  },
  render() {
    return <input
    onChange={this.onChange}/>
  }
});


let Test = createModelHolder(Input, 'fdf');

ReactDOM.render(
  <Test />,
  document.querySelector('.appContainer')
);