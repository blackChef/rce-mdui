import remove from 'lodash/remove';
import last from 'lodash/last';


let listeners = [];

let addListener = function(callback) {
  let id = Date.now();
  listeners.push({ id, callback });

  let removeListener = function() {
    remove(listeners, i => i.id === id);
  };

  return removeListener;
};

let onKeyPress = function(event) {
  if (event.key === 'Escape' && listeners.length !== 0) {
    last(listeners).callback();
  }
};

let init = function() {
  document.addEventListener('keyup', onKeyPress, false);
};

init();

export { addListener };

