import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import './index.scss';


const THUMB_WIDTH = 28; // px
const MARKER_WIDTH = 1; // px
const MARKER_COLOR = '#333333';

const makeGradient = function({ marks, min, max }) {
  const colorStops = marks.map(function({ value }) {
    if (value === min) {
      const leftPos = `0%`;
      const rightPos = `calc(0% + ${MARKER_WIDTH}px)`;

      return (
        `${MARKER_COLOR} ${leftPos},`+
        `${MARKER_COLOR} ${rightPos},`+
        `transparent ${rightPos}`
      );
    }

    if (value === max) {
      const leftPos = `calc(100% - ${MARKER_WIDTH}px)`;
      const rightPos = `100%`;

      return (
        `transparent ${leftPos},` +
        `${MARKER_COLOR} ${leftPos},` +
        `${MARKER_COLOR} ${rightPos}`
      );
    }

    const centerPos = (value - min) / (max - min) * 100 + '%';
    const halfMarkWidth = MARKER_WIDTH / 2;
    const leftPos = `calc(${centerPos} - ${halfMarkWidth}px)`;
    const rightPos = `calc(${centerPos} + ${halfMarkWidth}px)`;

    return (
      `transparent ${leftPos},` +
      `${MARKER_COLOR} ${leftPos},` +
      `${MARKER_COLOR} ${rightPos},` +
      `transparent ${rightPos}`
    );
  });

  return `linear-gradient(to right, ${colorStops.join(',')})`;
};


const name = 'RangeInput';

const init = function(props = {}) {
  const {
    min = 0,
    defaultValue = min,
  } = props;

  return defaultValue;
};

const update = function({ model, payload }) {
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
    const { inputElem } = this.state;
    if (inputElem === null) {
      return 0;
    }

    const inputWidth = inputElem.clientWidth;
    const progress = this.getProgress();

    // browser use this formula to compute thumb position:
    // position = inputWidth * progress - thumbWidth * progress
    return `${(inputWidth - THUMB_WIDTH) * progress}px`;
  },

  getProgress() {
    const { model, min = 0, max = 100 } = this.props;
    const ret = (model.val() - min) / (max - min);
    return +(ret.toFixed(6));
  },

  setRef(input) {
    if (input === null) {
      return;
    }

    const {
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
    const {
      model,
      className = '',
      // eslint-disable-next-line no-unused-vars
      dispatch, dispatcher,
      ...otherProps
    } = this.props;

    const { markGradient } = this.state;
    const progress = this.getProgress();
    const thumbPosition = this.getThumbPosition();

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
export default view;
export { init, view };
