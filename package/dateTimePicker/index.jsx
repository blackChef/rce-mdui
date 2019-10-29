import React from 'react';
import createClass from 'create-react-class';
import identity from 'lodash/identity';
import rome from 'rome';
import createComponent from 'rce-pattern/createComponent';
import { view as TextFieldBtn } from '../textField/button';
import { view as Dialog } from '../confirm';
import { view as Slot } from '../slot/';
import './index.scss';


let name = 'dateTimePicker';

let init = function() {
  return {
    show: false,
    time: Date.now(),
  };
};

let actions = {
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

let update = function(props) {
  let { type, ...otherProps } = props;
  actions[type](otherProps);
};

let Picker = createClass({
  componentDidMount() {
    let { elem } = this;
    let { initialValue, ...romeOptions } = this.props;
    let options = Object.assign(romeOptions, {
      initialValue: new Date(initialValue),
      timeInterval: 3600,
    });

    this.instance = rome(elem, options);
  },

  componentWillUnmount() {
    this.instance.destroy();
  },

  componentDidUpdate(prevProps) {
    let prevModel = prevProps.model;
    let curModel = this.props.model;

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
    let time = this.picker.getDate();
    this.props.dispatch('confirm', time);
    closeDialog();
  },

  render() {
    let {
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
    let time = model.time.val();

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
