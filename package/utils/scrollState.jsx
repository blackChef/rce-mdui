
let getSt = function() {
  return document.documentElement.scrollTop || document.body.scrollTop || 0;
};

let setSt = function(st) {
  document.documentElement.scrollTop = document.body.scrollTop = st;
};


let mainSelector, mainBodySelector;
let requireDisableScrollCount = 0;
let currentScrollTop = 0;

let enableScroll = function() {
  let main = document.querySelector(mainSelector);
  let mainBody = document.querySelector(mainBodySelector);

  requireDisableScrollCount -= 1;

  if (
    requireDisableScrollCount === 0 &&
    main &&
    mainBody
  ) {
    main.style.height = '';
    main.style.overflow = '';
    mainBody.style.transform = '';
    main.dataset.isScrollDisabled = true;
    setSt(currentScrollTop);
  }
};

let disableScroll = function() {
  let main = document.querySelector(mainSelector);
  let mainBody = document.querySelector(mainBodySelector);

  requireDisableScrollCount += 1;

  // `count === 1` means that it's the first time that we want to disable scroll
  if (
    requireDisableScrollCount === 1 &&
    main &&
    mainBody
  ) {
    currentScrollTop = getSt();
    main.dataset.isScrollDisabled = false;
    main.style.height = '100vh';
    main.style.overflow = 'hidden';
    mainBody.style.transform = `translateY(-${currentScrollTop}px)`;
  }
};

let init = function({
  mainSelector: _mainSelector,
  mainBodySelector: _mainBodySelector
}) {
  mainSelector = _mainSelector;
  mainBodySelector = _mainBodySelector;
};

export { init, enableScroll, disableScroll };