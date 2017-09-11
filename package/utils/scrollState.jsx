

let getSt = function() {
  return document.documentElement.scrollTop || document.body.scrollTop || 0;
};

let setSt = function(st) {
  document.documentElement.scrollTop = document.body.scrollTop = st;
};


let mainSelector, mainBodySelector, mainHeaderSelector;
let styleType = 'transform';
let moveHeader = false;
let isDisabled = false;
let requireDisableScrollCount = 0;
let currentScrollTop = 0;
let onEnableCallbacks = [];
let onDisableCallbacks = [];

let onEnableScroll = function(callback) {
  let id = Date.now();
  onEnableCallbacks = onEnableCallbacks.concat({ id, callback });
  return function() {
    onEnableCallbacks = onEnableCallbacks.filter(i => i.id !== id);
  };
};

let onDisableScroll = function(callback) {
  let id = Date.now();
  onDisableCallbacks = onDisableCallbacks.concat({ id, callback });
  return function() {
    onDisableCallbacks = onDisableCallbacks.filter(i => i.id !== id);
  };
};

let getIsScrollDisabled = () => isDisabled;

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

    if (styleType === 'transform') {
      mainBody.style.transform = ``;
    } else if (styleType === 'margin') {
      mainBody.style.marginTop = ``;
    }

    if (moveHeader) {
      let mainHeader = document.querySelector(mainHeaderSelector);
      if (styleType === 'transform') {
        mainHeader.style.transform = ``;
      } else if (styleType === 'margin') {
        mainHeader.style.marginTop = ``;
      }
    }

    main.dataset.isScrollDisabled = false;
    setSt(currentScrollTop);

    isDisabled = false;
    onEnableCallbacks.forEach(function(item) {
      item.callback();
    });
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
    main.dataset.isScrollDisabled = true;
    main.style.height = '100vh';
    main.style.overflow = 'hidden';

    if (styleType === 'transform') {
      mainBody.style.transform = `translateY(-${currentScrollTop}px)`;
    } else if (styleType === 'margin') {
      mainBody.style.marginTop = `-${currentScrollTop}px`;
    }

    if (moveHeader) {
      let mainHeader = document.querySelector(mainHeaderSelector);
      if (styleType === 'transform') {
        mainHeader.style.transform = `translateY(-${currentScrollTop}px)`;
      } else if (styleType === 'margin') {
        mainHeader.style.marginTop = `-${currentScrollTop}px`;
      }
    }

    isDisabled = true;
    onDisableCallbacks.forEach(function(item) {
      item.callback();
    });
  }
};

let init = function({
  mainSelector: _mainSelector,
  mainBodySelector: _mainBodySelector,
  mainHeaderSelector: _mainHeaderSelector,
  styleType: _styleType = 'transform', // transform | margin
  moveHeader: _moveHeader = false,
}) {
  mainSelector = _mainSelector;
  mainBodySelector = _mainBodySelector;
  mainHeaderSelector = _mainHeaderSelector;
  styleType = _styleType;
  moveHeader = _moveHeader;
};

export {
  init,
  enableScroll,
  disableScroll,
  onEnableScroll,
  onDisableScroll,
  getIsScrollDisabled
};