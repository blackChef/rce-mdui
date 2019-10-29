
let highestZIndex = 0;

const increaseDepth = function(elem) {
  highestZIndex += 1;
  if (!elem) return;
  elem.style.zIndex = highestZIndex;
};

const decreaseDepth = function(elem) {
  highestZIndex -= 1;
  if (!elem) return;
  elem.style.zIndex = '';
};

const init = function(bazeZIndex) {
  highestZIndex = bazeZIndex;
};

export { init, increaseDepth, decreaseDepth };