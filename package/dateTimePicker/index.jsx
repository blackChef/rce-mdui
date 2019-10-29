import React from 'react';
import createClass from 'create-react-class';
import identity from 'lodash/identity';
import rome from 'rome';
import createComponent from 'rce-pattern/createComponent';
import { view as TextFieldBtn } from '../textField/button';
import { view as Dialog } from '../confirm';
import { view as Slot } from '../slot/';
import './index.scss';


const name = 'dateTimePicker';

const init = function() {
  return {
    show: false,
    time: Date.now(),
  };
};

const actions = {
  // { payload, model, dispatch, getLatestModel }
  showPicker({ model, payload: { disabled, readOnly } }) {
    if (!disabled && !readOnly) {
      model.show.set(true);
    }
  },
  confirm({ model, payload }) {
    model.time.set(+payload);
  },
};

const update = function(props) {
  const { type, ...otherProps } = props;
  actions[type](otherProps);
};

const Picker = createClass({
  componentDidMount() {
    const { elem } = this;
    const { initialValue, ...romeOptions } = this.props;
    const options = Object.assign(romeOptions, {
      initialValue: new Date(initialValue),
      timeInterval: 3600,
    });

    this.instance = rome(elem, options);
  },

  componentWillUnmount() {
    this.instance.destroy();
  },

  componentDidUpdate(prevProps) {
    const prevModel = prevProps.model;
    const curModel = this.props.model;

    if (prevModel !== curModel) {
      this.instance.setValue(curModel.time.val());
    }
  },

  getDate() {
    return this.instance.getDate();
  },

  render() {
    return (
      <div ref={e => this.elem = e} />
    );
  },
});

let view = createClass({
  confirm(closeDialog) {
    const time = this.picker.getDate();
    this.props.dispatch('confirm', time);
    closeDialog();
  },

  render() {
    const {
      model,
      dispatcher,
      label,
      floatingLabel = label,
      timeFormatter = identity,
      disabled, readOnly,
      okLabel,
      cancelLabel,
      ...otherProps
    } = this.props;
    const time = model.time.val();

    return (
      <React.Fragment>
        <Dialog
          className="dialog--noContentSidePadding dateTimeRangePicker_dialog"
          model={model.show}
          onConfirm={this.confirm}
          okLabel={okLabel}
          cancelLabel={cancelLabel}
        >
          <Slot name="content">
            <Picker
              {...otherProps}
              initialValue={time}
              ref={e => this.picker = e}
            />
          </Slot>
        </Dialog>

        <TextFieldBtn
          className="textFieldBtn--dropDown"
          floatingLabel={floatingLabel}
          onClick={dispatcher('showPicker', { disabled, readOnly })}
          value={timeFormatter(time)}
        />
      </React.Fragment>
    );
  },
});

view = createComponent({ name, view, update });
export default view;
export { init, view };
