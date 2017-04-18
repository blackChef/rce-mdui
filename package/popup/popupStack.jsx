let getSt = function() {
  return document.documentElement.scrollTop || document.body.scrollTop || 0;
};

let setSt = function(st) {
  document.documentElement.scrollTop = document.body.scrollTop = st;
};


let state = {
  currentScrollTop: 0,
  requireDisableScrollCount: 0,
  opendPopupCount: 0,

  enableScroll() {
    let main = document.querySelector(this.mainSelector);
    let mainBody = document.querySelector(this.mainBodySelector);

    this.requireDisableScrollCount -= 1;

    if (
      this.requireDisableScrollCount === 0 && main && mainBody
    ) {
      main.style.height = '';
      main.style.overflow = '';
      mainBody.style.transform = '';
      main.dataset.isScrollDisabled = true;
      setSt(this.currentScrollTop);
    }
  },

  disableScroll() {
    let main = document.querySelector(this.mainSelector);
    let mainBody = document.querySelector(this.mainBodySelector);

    this.requireDisableScrollCount += 1;

    // `count === 1` means that it's first time that we want to disable scroll
    if (this.requireDisableScrollCount === 1 && main && mainBody) {
      this.currentScrollTop = getSt();
      main.dataset.isScrollDisabled = false;
      main.style.height = '100vh';
      main.style.overflow = 'hidden';
      mainBody.style.transform = `translateY(-${this.currentScrollTop}px)`;
    }
  },

  openPopup(elem, shouldDisableScroll = true) {
    this.opendPopupCount += 1;
    elem.style.zIndex = this.baseZIndex + this.opendPopupCount;
    if (shouldDisableScroll) this.disableScroll();

    let closePopup = function() {
      elem.style.zIndex = '';
      this.opendPopupCount -= 1;
      if (shouldDisableScroll) this.enableScroll();
    }.bind(this);

    // delay is used when we want to reset zIndex after animation end
    return function(delay = 0) {
      delay !== 0 ? setTimeout(closePopup, delay) : closePopup();
    };
  },
};

let initPopupState = function({ baseZIndex, mainSelector, mainBodySelector }) {
  Object.assign(state, {
    baseZIndex: parseInt(baseZIndex, 10), mainSelector, mainBodySelector
  });
};

let resetPopupState = function() {
  Object.assign(state, {
    currentScrollTop: 0,
    requireDisableScrollCount: 0,
    opendPopupCount: 0,
  });
};

let openPopup = state.openPopup.bind(state);
let disableScroll = state.disableScroll.bind(state);
let enableScroll = state.enableScroll.bind(state);

export { initPopupState, resetPopupState, openPopup, enableScroll, disableScroll };
