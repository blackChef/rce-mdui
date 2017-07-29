import React from 'react';
import ReactDOM from 'react-dom';
import createModelHolder from 'rce-pattern/createModelHolder';
import createComponent from 'rce-pattern/createComponent';
import { view as DialogView } from 'dialogView';
import { view as Slot } from 'slot/';

let App = function({ model }) {
  let onClick = function() {
    model.set(!model.val());
  };
  return (
    <div>
      <button onClick={onClick}>toggle</button>
      <DialogView
        className="dialogView--bottomSheet"
        model={model}>
          <Slot name="body">
            <div style={{ height: '100vh' }}></div>
          </Slot>
        </DialogView>
    </div>
  );
};

App = createComponent({
  view: App
});

App = createModelHolder(App, false);

ReactDOM.render(
  <App />,
  document.querySelector('.appContainer')
);