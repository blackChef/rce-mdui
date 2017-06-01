import merge from 'lodash/merge';
import noop from 'lodash/noop';
import init from './init';
import makePromise from '../utils/emptyPromise';

// model updating uses 1 tick delay, so we have to use 2 ticks here
let resolve = makePromise({ type: 'resolve', ticks: 2 });

let actions = {
  getData({ payload = {}, dispatch, model, getLatestModel }) {
    let {
      getContent = resolve,
      getSelectOptions = resolve,
      setContent = noop,
      setSelectOptions = noop
    } = payload;

    dispatch('setFetchingStatus', { status: 'loading' });
    dispatch('setIsReady', false);

    Promise.all([
      getContent(),
      getSelectOptions()

    ]).then(function([res1, res2]) {
      let newModel = getLatestModel();
      setContent(res1, newModel.content);
      setSelectOptions(res2, newModel.selectOptions);
      dispatch('setFetchingStatus', { status: 'success', requestType: 'getData' });
      dispatch('setIsReady', true);

    }).catch(function(err) {
      dispatch('setFetchingStatus', {
        status: 'failed',
        failedMsg: err.message
      });

      console.error(err);
    });
  },

  save({ payload, model, dispatch }) {

    let { apiCalls, onSave = noop, validate = () => true } = payload;
    let content = model.content.val();

    let validateResult = validate(content);
    if (validateResult !== true) {
      model.isInvalid.set(true);
      model.invalidMsg.set(validateResult);
      return;
    }

    let { saveContent = resolve } = apiCalls;

    dispatch('setIsSaving', true);
    dispatch('setFetchingStatus', { status: 'loading', requestType: 'save' });

    saveContent(content).then(function() {
      dispatch('setIsSaving', false);
      dispatch('setFetchingStatus', { status: 'success' });
      dispatch('closeDialog');
      onSave(content);

    }).catch(function(err) {
      dispatch('setFetchingStatus', {
        status: 'failed',
        failedMsg: err.message,
      });

      setTimeout(function() {
        dispatch('setIsSaving', false);
      }, 100);

      console.error(err);
    });
  },

  setIsSaving({ payload, model }) {
    model.isSaving.set(payload);
  },

  setIsReady({ payload, model }) {
    model.isContentReady.set(payload);
  },

  setFetchingStatus({ payload, model }) {
    let curVal = model.loadingScreenModel.val();
    model.loadingScreenModel.set( merge({}, curVal, payload) );
  },

  reset({ model }) {
    model.set( init() );
  },

  closeDialog({ model, dispatch }) {
    model.show.set(false);
    setTimeout(function() {
      dispatch('reset');
    }, 400);
  },

  setOpenAnimStatus({ model, payload }) {
    model.isOpenAnimationEnd.set(payload);
  },
};


let update = function(props) {
  actions[props.type](props);
};

export default update;