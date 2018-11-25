import React from 'react';
import ReactDOM from 'react-dom';
import createModelHolder from 'rce-pattern/createModelHolder';
import createComponent from 'rce-pattern/createComponent';
import { view as Slot } from 'slot/';
import { view as Component, init as _init } from 'textField/';



let init = function() {
  return _init();
};


let App = function({ model }) {
  return (
    <div>
    <button onClick={() => model.set('loading')}>loading</button>
    <button onClick={() => model.set('success')}>success</button>
    <button onClick={() => model.set('failed')}>failed</button>
      <Component
        model={model}
        floatingLabel="123"
      >
      </Component>
    </div>
  );
};


App = createComponent({
  view: App
});

App = createModelHolder(App, init);

ReactDOM.render(
  <App />,
  document.querySelector('.appContainer')
);