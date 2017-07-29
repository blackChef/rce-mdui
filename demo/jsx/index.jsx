import React from 'react';
import ReactDOM from 'react-dom';
import createModelHolder from 'rce-pattern/createModelHolder';
import createComponent from 'rce-pattern/createComponent';
import { view as DialogView, init } from 'bottomSheet';
import { view as Slot } from 'slot/';

let App = function({ model }) {
  let onClick = function() {
    model.show.set(!model.show.val());
  };
  return (
    <div>
      <button onClick={onClick}>toggle</button>
      <DialogView
        model={model}>
          <div style={{ height: '100vh' }}></div>
        </DialogView>
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