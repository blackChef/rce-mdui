import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import { view as Dialog } from '../confirm';
import { view as Slot } from '../slot/';
import { view as TextFieldBtn } from '../textField/button';
import { view as Picker } from './picker';
import padTime from './padTime';


let name = 'TimePicker';

let init = function() {
  return {
    isShown: false,
    hour: 0,
    minute: 0,
  };
};

let actions = {
  // { payload, model, dispatch, getLatestModel }
  showPicker({ model, payload: { disabled, readOnly } }) {
    if (!disabled && !readOnly) {
      model.isShown.set(true);
    }
  },
  cancel({ model, payload: { hour, minute } }) {
    model.hour.set(hour);
    model.minute.set(minute);
  }
};

let update = function(props) {
  let { type, ...otherProps } = props;
  actions[type](otherProps);
};


let view = createClass({
  getInitialState() {
    let { hour, minute } = this.props.model.val();
    return { confirmedTime: { hour, minute } };
  },
  onConfirm(closeDialog) {
    let { hour, minute } = this.props.model.val();
    this.setState({ confirmedTime: { hour, minute } });
    closeDialog();
  },
  onCancel(closeDialog) {
    closeDialog();
    setTimeout(() => {
      this.props.dispatch('cancel', this.state.confirmedTime);
    }, 300);
  },
  render() {
    let {
      model,
      dispatcher,
      floatingLabel,
      disabled,
      readOnly,
      okLabel,
      cancelLabel,
      hourLabel,
      minuteLabel,
    } = this.props;
    let { confirmedTime: { hour, minute } } = this.state;
    let display = `${padTime(hour)}:${padTime(minute)}`;
    return (
      <React.Fragment>
        <Dialog
          className="dialog--noContentSidePadding timePicker_dialog"
          model={model.isShown}
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
          okLabel={okLabel}
          cancelLabel={cancelLabel}
        >
          <Slot name="content">
            <Picker hour={model.hour} minute={model.minute} hourLabel={hourLabel} minuteLabel={minuteLabel}/>
          </Slot>
        </Dialog>

        <TextFieldBtn
          className="textFieldBtn--dropDown"
          floatingLabel={floatingLabel}
          onClick={dispatcher('showPicker', { disabled, readOnly })}
          value={display}
        />
      </React.Fragment>
    );
  },
});


view = createComponent({ name, view, update });
export { init, view };