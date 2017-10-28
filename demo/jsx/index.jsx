import React from 'react';
import ReactDOM from 'react-dom';
import createModelHolder from 'rce-pattern/createModelHolder';
import createComponent from 'rce-pattern/createComponent';
import { view as Slot } from 'slot/';
import { view as Dialog } from 'dialog/';
import { view as DialogView } from 'dialogView/';

let init = function() {
  return {
    d: false,
    dv: false
  };
};

let App = function({ model }) {
  let openD = function() {
    model.d.set(!model.d.val());
  };

  let openDV = function() {
    model.dv.set(!model.dv.val());
  };


  return (
    <div>
      <button onClick={openD}>toggle</button>

      <Dialog model={model.d}>
        <Slot name="content">
          <button onClick={openDV}>toggle</button>
        </Slot>
      </Dialog>

      <DialogView model={model.dv}>
        <Slot name="body">fff</Slot>
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