let getSt = function() {
  return document.documentElement.scrollTop || document.body.scrollTop || 0;
};

let setSt = function(st) {
  document.documentElement.scrollTop = document.body.scrollTop = st;
};


let state = {
  highestZIndex: 0,
  currentScrollTop: 0,
  popups: [/* { id, elem, shouldDisableScroll } */],

  enableScroll() {
    let main = document.querySelector(this.mainSelector);
    let mainBody = document.querySelector(this.mainBodySelector);

    let noPopupsRequireScrollDisabled = this.popups.filter(i => i.shouldDisableScroll).length === 0;
    if (noPopupsRequireScrollDisabled && main && mainBody) {
      main.style.height = '';
      main.style.overflow = '';
      mainBody.style.transform = '';
      setSt(this.currentScrollTop);
    }
  },

  disableScroll() {
    let main = document.querySelector(this.mainSelector);
    let mainBody = document.querySelector(this.mainBodySelector);

    // we append popup stack first, then try to disable scroll.
    // so if more then one item that has shouldDisableScroll set to true,
    // scroll must has already been disabled.
    let isDisabled = this.popups.filter(i => i.shouldDisableScroll).length > 1;
    if (!isDisabled && main && mainBody) {
      this.currentScrollTop = getSt();
      main.style.height = '100vh';
      main.style.overflow = 'hidden';
      mainBody.style.transform = `translateY(-${this.currentScrollTop}px)`;
    }
  },

  openPopup(elem, shouldDisableScroll = true) {
    let id = Date.now();
    elem.style.zIndex = this.baseZIndex + this.highestZIndex;
    this.highestZIndex = this.highestZIndex + 1;
    this.popups = this.popups.concat({ id, elem, shouldDisableScroll });
    if (shouldDisableScroll) this.disableScroll();

    let closePopup = function() {
      elem.style.zIndex = '';
      this.popups = this.popups.filter(i => i.id !== id);
      if (shouldDisableScroll) this.enableScroll();

      // it's safe to reset highestZIndex when there are no popups opened.
      if (this.popups.length === 0) this.highestZIndex = 0;
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
    highestZIndex: 0,
    popups: [],
  });
};

let openPopup = state.openPopup.bind(state);
let disableScroll = state.disableScroll.bind(state);
let enableScroll = state.enableScroll.bind(state);

export { initPopupState, resetPopupState, openPopup, enableScroll, disableScroll };
