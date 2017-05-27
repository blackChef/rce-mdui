import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import createProxyModel from 'rce-pattern/createProxyModel';
import { view as Slider } from './index';


let name = 'RangeInput_range';

let init = function(props = {}) {
  let {
    min = 0,
    max = 100,
    startValue = min,
    endValue = max,
  } = props;

  return {
    startValue,
    endValue
  };
};

let update = function({ type, payload, model, dispatch }) {
  if (type === 'updateStartVal') {
    let endValue = model.endValue.val();
    // if (payload > endValue) {
    //   model.startValue.set(endValue);
    //   return;
    // }

    model.startValue.set(payload);
  }

  else if (type === 'updateEndVal') {
    // console.log('updateEndVal');
    // let startValue = model.startValue.val();
    // if (payload < startValue) {
    //   // console.log('payload', payload);
    //   // console.log('startValue', startValue);

    //   model.endValue.set(payload * 1 + '');

    //   // model.endValue.set(startValue);
    //   return;
    // }
    // console.log('update model', model.endValue.val(), payload);

    // if (model.endValue.val() === 95) {
    //   debugger
    // }
    console.log(payload);
    model.endValue.set(95);
  }
};

let view = React.createClass({
  render() {
    let {
      model,
      dispatch,
      dispatcher,
      min = 0,
      max = 100
    } = this.props;

    let startValue = model.startValue.val();
    let endValue = model.endValue.val();

    let trackWidth = (
      (endValue - startValue) /
      (max - min)
    );

    let trackOffset = (
      startValue /
      (max - min) *
      100 + '%'
    );

    let trackStyle = {
      transform: `translateX(${trackOffset}) scaleX(${trackWidth})`
    };

    // Take control of model update so that we can add constrains
    let startInputModel = createProxyModel(
      startValue,
      function(newVal) {
        dispatch('updateStartVal', newVal);
      }
    );

    let endInputModel = createProxyModel(
      endValue,
      function(newVal) {
        dispatch('updateEndVal', newVal);
      }
    );

    return (
      <div className="rangeInput_range" ref={this.setInput}>
        <Slider
          className="rangeInput--bubble rangeInput_range_start"
          min={min}
          max={max}
          model={startInputModel}
        />
        <Slider
          className="rangeInput--bubble rangeInput_range_end"
          min={min}
          max={max}
          model={endInputModel}
        />
        <div style={trackStyle} className="rangeInput_range_track"/>
      </div>
    );
  },
});



view = createComponent({ name, view, update });
export { init, view };