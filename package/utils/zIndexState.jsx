
let highestZIndex = 0;

let increaseDepth = function(elem) {
  highestZIndex += 1;
  if (!elem) return;
  elem.style.zIndex = highestZIndex;
};

let decreaseDepth = function(elem) {
  highestZIndex -= 1;
  if (!elem) return;
  elem.style.zIndex = '';
};

let init = function(bazeZIndex) {
  highestZIndex = bazeZIndex;
};

export { init, increaseDepth, decreaseDepth };