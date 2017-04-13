import noop from 'lodash/noop';

let init = function() {
  return {
    content: null,
    selectOptions: null,
    isInvalid: false,
    invalidMsg: '',
    show: false,
    loadingScreenModel: {
      status: 'hide',
      loadingMsg: '加载中...',
      failedMsg: '失败了',
      onRequestRetry: noop,
    },
    isContentReady: false,
    isSaving: false,
    isOpenAnimationEnd: false,
  };
};

export default init;