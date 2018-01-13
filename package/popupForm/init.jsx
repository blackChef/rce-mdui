let init = function() {
  return {
    content: null,
    selectOptions: null,
    isInvalid: false,
    invalidMsg: '',
    show: false,
    loadingScreenModel: {
      status: 'hide',
      failedMsg: '失败了',
      requestType: 'getData',
    },
    isContentReady: false,
    isSaving: false,
    isOpenAnimationEnd: false,
  };
};

export default init;