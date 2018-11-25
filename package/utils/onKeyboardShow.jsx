import debounce from 'lodash/debounce';

// If window.innerHeight change, virtual keyboard must be opened.
// Focused content might be covered by keyboard.
// When keyboard shows, it takes up some height of viewport.
// Then it tries to move focused content to the bottom of viewport (scroll).

let initialWindowHeight = window.innerHeight;
let onKeyboardShow = function(callback) {
  if (window.innerHeight === initialWindowHeight) return;
  let isScrolled = false;
  setTimeout(() => {
    if (!isScrolled) callback();
  }, 20);
  let onScroll = debounce(() => {
    if (!isScrolled) {
      isScrolled = true;
      return;
    }
    callback();
    window.removeEventListener('scroll', onScroll);
  }, 40, { leading: true });
  window.addEventListener('scroll', onScroll, false);
};

let moveAnchorIntoView = function(targetOffsetBottom = 0) {
  let selection = window.getSelection();
  if (selection.anchorNode === null) return;

  let range = selection.getRangeAt(0);
  // Get 0 for range.getBoundingClientRect when focusing on empty block
  let rangeClientBottom = range.getBoundingClientRect().bottom
    || range.endContainer.getBoundingClientRect().bottom;
  let offsetBottom = window.innerHeight - rangeClientBottom;
  if (offsetBottom < targetOffsetBottom) {
    window.scrollBy(0, (targetOffsetBottom - offsetBottom));
  }
};

let moveAnchorIntoViewWhenKeyboardShow = function(targetOffsetBottom) {
  let onResize = function() {
    onKeyboardShow(() => moveAnchorIntoView(targetOffsetBottom));
  };
  window.addEventListener('resize', onResize, false);
  return () => window.removeEventListener('resize', onResize);
};

export { moveAnchorIntoViewWhenKeyboardShow, onKeyboardShow };
