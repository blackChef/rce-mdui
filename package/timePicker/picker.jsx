import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { view as RangeInput } from '../rangeInput/';
import padTime from './padTime';


let name = 'Picker';

let init = function() {};

let view = function({ hour, minute, hourLabel = '小时', minuteLabel = '分钟' }) {
  return (
    <div className="timePicker">
      <div className="timePicker_display">
        <div className="timePicker_display_hour">{padTime(hour.val())}</div>
        <div className="timePicker_display_minute">{padTime(minute.val())}</div>
      </div>

      <div className="timePicker_control">
        <div className="timePicker_control_input">
          <div className="timePicker_control_input_label">{hourLabel}:</div>
          <RangeInput min={0} max={23} model={hour}/>
        </div>
        <div className="timePicker_control_input">
          <div className="timePicker_control_input_label">{minuteLabel}:</div>
          <RangeInput min={0} max={59} model={minute}/>
        </div>
      </div>
    </div>
  );
};

view = createComponent({ name, view });
export default view;
export { init, view };
