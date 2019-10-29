import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import { view as Dialog } from '../confirm';
import { view as Slot } from '../slot/';
import { view as TextFieldBtn } from '../textField/button';
import { view as Picker } from './picker';
import padTime from './padTime';
import './index.scss';


const name = 'TimePicker';

const init = function() {
  return {
    isShown: false,
    hour: 0,
    minute: 0,
  };
};

const actions = {
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

const update = function(props) {
  const { type, ...otherProps } = props;
  actions[type](otherProps);
};


let view = createClass({
  getInitialState() {
    const { hour, minute } = this.props.model.val();
    return { confirmedTime: { hour, minute } };
  },
  onConfirm(closeDialog) {
    const { hour, minute } = this.props.model.val();
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
    const {
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
    const { confirmedTime: { hour, minute } } = this.state;
    const display = `${padTime(hour)}:${padTime(minute)}`;
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
export default view;
export { init, view };
