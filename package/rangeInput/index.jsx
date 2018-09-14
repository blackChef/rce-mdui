import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';


const THUMB_WIDTH = 28; // px
const MARKER_WIDTH = 1; // px
const MARKER_COLOR = '#333333';

let makeGradient = function({ marks, min, max }) {
  let colorStops = marks.map(function({ value }) {
    if (value === min) {
      let leftPos = `0%`;
      let rightPos = `calc(0% + ${MARKER_WIDTH}px)`;

      return (
        `${MARKER_COLOR} ${leftPos},`+
        `${MARKER_COLOR} ${rightPos},`+
        `transparent ${rightPos}`
      );
    }

    if (value === max) {
      let leftPos = `calc(100% - ${MARKER_WIDTH}px)`;
      let rightPos = `100%`;

      return (
        `transparent ${leftPos},` +
        `${MARKER_COLOR} ${leftPos},` +
        `${MARKER_COLOR} ${rightPos}`
      );
    }

    let centerPos = (value - min) / (max - min) * 100 + '%';
    let halfMarkWidth = MARKER_WIDTH / 2;
    let leftPos = `calc(${centerPos} - ${halfMarkWidth}px)`;
    let rightPos = `calc(${centerPos} + ${halfMarkWidth}px)`;

    return (
      `transparent ${leftPos},` +
      `${MARKER_COLOR} ${leftPos},` +
      `${MARKER_COLOR} ${rightPos},` +
      `transparent ${rightPos}`
    );
  });

  return `linear-gradient(to right, ${colorStops.join(',')})`;
};


let name = 'RangeInput';

let init = function(props = {}) {
  let {
    min = 0,
    defaultValue = min,
  } = props;

  return defaultValue;
};

let update = function({ model, payload }) {
  model.set(payload);
};

let view = createClass({
  getInitialState() {
    return {
      inputElem: null,
      markGradient: ''
    };
  },

  getThumbPosition() {
    let { inputElem } = this.state;
    if (inputElem === null) {
      return 0;
    }

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
    if (input === null) {
      return;
    }

    let {
      marks = [ /* { value: Number, label: String } */ ],
      min = 0,
      max = 100,
    } = this.props;

    this.setState({
      inputElem: input,
      markGradient: makeGradient({
        inputWidth: input.clientWidth,
        marks, min, max
      })
    });
  },

  update(event) {
    this.props.dispatch('update', +event.target.value);
  },

  render() {
    let {
      model,
      className = '',
      // eslint-disable-next-line no-unused-vars
      dispatch, dispatcher,
      ...otherProps
    } = this.props;

    let { markGradient } = this.state;
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

        <div className="rangeInput_track">
          <div className="rangeInput_track_marks"
            style={{ backgroundImage: markGradient }}
          />

          <div
            className="rangeInput_track_front"
            style={{ transform: `scaleX(${progress})` }}
          />

          <div className="rangeInput_track_bg" />
        </div>

        <div
          className="rangeInput_tooltip"
          style={{ transform: `translateX(${thumbPosition})` }}
        >
          <div className="rangeInput_tooltip_content">
            {model.val()}
          </div>
        </div>
      </div>
    );
  },
});

view = createComponent({ name, view, update });
export { init, view };