let defaultState = {
 mainSelector: null,
 mainBodySelector: null,
 styleType: 'margin',
 isDisabled: false,
 requireDisableScrollCount: 0,
 currentScrollTop: 0,
 onEnableCallbacks: [],
 onDisableCallbacks: [],
};

let state = {};


let onEvent = function(key) {
  return function(callback) {
    let id = Date.now();
    state[key] = state[key].concat({ id, callback });
    return function() {
      state[key] = state[key].filter(i => i.id !== id);
    };
  };
};

let runEventCallbacks = function(key) {
  state[key].forEach(i => i.callback());
};

let onEnableScroll = onEvent('onEnableCallbacks');

let onDisableScroll = onEvent('onDisableCallbacks');

let getSt = function() {
  return document.documentElement.scrollTop ||
    document.body.scrollTop || 0;
};

let setSt = function(st) {
  document.documentElement.scrollTop =
    document.body.scrollTop = st;
};

let removeStyle = function() {
  let main = document.querySelector(state.mainSelector);
  let mainBody = document.querySelector(state.mainBodySelector);

  if (main && mainBody) {
    main.style.height = '';
    main.style.overflow = '';

    if (state.styleType === 'transform') {
      mainBody.style.transform = ``;
    } else if (state.styleType === 'margin') {
      mainBody.style.marginTop = ``;
    }

    main.dataset.isScrollDisabled = false;

    // restore previous scroll position
    setSt(state.currentScrollTop);
  }
};

let applyStyle = function() {
  let main = document.querySelector(state.mainSelector);
  let mainBody = document.querySelector(state.mainBodySelector);

  if (main && mainBody) {
    state.currentScrollTop = getSt();

    main.dataset.isScrollDisabled = true;
    main.style.height = '100vh';
    main.style.overflow = 'hidden';

    if (state.styleType === 'transform') {
      mainBody.style.transform = `translateY(-${state.currentScrollTop}px)`;
    } else if (state.styleType === 'margin') {
      mainBody.style.marginTop = `-${state.currentScrollTop}px`;
    }
  }
};

let enableScroll = function() {
  if (!state.isDisabled) {
    return;
  }

  state.requireDisableScrollCount -= 1;

  if (state.requireDisableScrollCount === 0) {
    removeStyle();
    state.isDisabled = false;
    runEventCallbacks('onEnableCallbacks');
  }
};

let disableScroll = function() {
  state.requireDisableScrollCount += 1;

  // `count === 1` means that it's the first time that we want to disable scroll
  if (state.requireDisableScrollCount === 1) {
    applyStyle();
    state.isDisabled = true;
    runEventCallbacks('onDisableCallbacks');
  }
};

let init = function(props) {
  state = { ...defaultState, ...props };
  removeStyle();
};

let getIsScrollDisabled = () => state.isDisabled;

export {
  init,
  enableScroll,
  disableScroll,
  onEnableScroll,
  onDisableScroll,
  getIsScrollDisabled
};