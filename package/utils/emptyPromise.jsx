import curry from 'lodash/curry';

let makeDelay = curry(function(type, ticks, resolve, reject) {
  let loop = function() {
    setTimeout(function() {
      if (ticks > 0) {
        ticks -= 1;
        loop();
      } else {
        if (type === 'resolve') {
          resolve();
        } else {
          reject();
        }
      }
    }, 0);
  };

  loop();
});


let makePromise = function({ type = 'resolve', ticks = 1 }) {
  return () => new Promise( makeDelay(type, ticks) );
};

export default makePromise;