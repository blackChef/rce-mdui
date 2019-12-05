
export const afterOneTick = function() {
  return new Promise(function(resolve) {
    requestAnimationFrame(resolve);
  });
};

export const afterTwoTicks = function() {
  return new Promise(function(resolve) {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
};

export const afterDuration = function(duration) {
  return new Promise(function(resolve) {
    setTimeout(resolve, duration);;
  });
};

