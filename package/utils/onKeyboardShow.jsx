import debounce from 'lodash/debounce';

// If window.innerHeight change, virtual keyboard must be opened.
// Focused content might be covered by keyboard.
// When keyboard shows, it takes up some height of viewport.
// Then it tries to move focused content to the bottom of viewport (scroll).

const initialWindowHeight = window.innerHeight;
const onKeyboardShow = function(callback) {
  if (window.innerHeight === initialWindowHeight) return;
  let isScrolled = false;
  setTimeout(() => {
    if (!isScrolled) callback();
  }, 20);
  const onScroll = debounce(() => {
    if (!isScrolled) {
      isScrolled = true;
      return;
    }
    callback();
    window.removeEventListener('scroll', onScroll);
  }, 40, { leading: true });
  window.addEventListener('scroll', onScroll, false);
};

const moveAnchorIntoView = function(targetOffsetBottom = 0) {
  const selection = window.getSelection();
  if (selection.anchorNode === null) return;

  const range = selection.getRangeAt(0);
  // Get 0 for range.getBoundingClientRect when focusing on empty block
  const rangeClientBottom = range.getBoundingClientRect().bottom
    || range.endContainer.getBoundingClientRect().bottom;
  const offsetBottom = window.innerHeight - rangeClientBottom;
  if (offsetBottom < targetOffsetBottom) {
    window.scrollBy(0, (targetOffsetBottom - offsetBottom));
  }
};

const moveAnchorIntoViewWhenKeyboardShow = function(targetOffsetBottom) {
  const onResize = function() {
    onKeyboardShow(() => moveAnchorIntoView(targetOffsetBottom));
  };
  window.addEventListener('resize', onResize, false);
  return () => window.removeEventListener('resize', onResize);
};

export { moveAnchorIntoViewWhenKeyboardShow, onKeyboardShow };
