import React from 'react';
import createComponent from 'rce-pattern/createComponent';


const THUMB_WIDTH = 14; // px


let name = 'RangeInput';

let init = function(props = {}) {
  let {
    min = 0,
    max = 100,
    defaultValue = min,
  } = props;

  return defaultValue;
};

let update = function({ type, payload, model, dispatch }) {
  model.set(payload);
};

let view = React.createClass({
  getThumbPosition() {
    let { inputElem } = this;
    if (!this.inputElem) { return '0'; }

    let inputWidth = inputElem.clientWidth;
    let progress = this.getProgress();

    // browser use this formula to compute thumb position:
    // position = inputWidth * progress - thumbWidth * progress
    return `${(inputWidth - THUMB_WIDTH) * progress}px`;
  },

  getProgress() {
    let { model, min = 0, max = 100 } = this.props;
    let ret = (model.val() - min) / (max - min);
    return +(ret.toFixed(6));
  },

  setRef(input) {
    this.inputElem = input;
  },

  update(event) {
    this.props.dispatch('update', +event.target.value);
  },

  render() {
    let {
      dispatch,
      dispatcher,
      model,
      className = '',
      ...otherProps
    } = this.props;

    let progress = this.getProgress();
    let thumbPosition = this.getThumbPosition();

    return (
      <div className={`rangeInput ${className}`}>
        <input type="range" ref={this.setRef}
          {...otherProps}
          className="rangeInput_input"
          value={model.val()}
          onChange={this.update}
        />

        <div
          className="rangeInput_track_front"
          style={{ transform: `scaleX(${progress})` }}></div>

        <div className="rangeInput_track_bg">
          <div className="rangeInput_track_bg_steps"></div>
        </div>

        {this.inputElem &&
          <div
            className="rangeInput_tooltip"
            style={{ transform: `translateX(${thumbPosition})` }}
          >
            <div className="rangeInput_tooltip_content">
              {model.val()}
            </div>
          </div>
        }
      </div>
    );
  },
});

view = createComponent({ name, view, update });
export { init, view };