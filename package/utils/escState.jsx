import remove from 'lodash/remove';
import last from 'lodash/last';


const listeners = [];

const addListener = function(callback) {
  const id = Date.now();
  listeners.push({ id, callback });

  const removeListener = function() {
    remove(listeners, i => i.id === id);
  };

  return removeListener;
};

const onKeyPress = function(event) {
  if (event.key === 'Escape' && listeners.length !== 0) {
    last(listeners).callback();
  }
};

const init = function() {
  document.addEventListener('keyup', onKeyPress, false);
};

init();

export default addListener;

