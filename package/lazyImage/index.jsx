import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import createModelHolder from 'rce-pattern/createModelHolder';
import { onEnter } from './intersectionObserver';



let name = 'LazyImage';

let init = function() {};

let update = function({ type, payload, model, dispatch, getLatestModel }) {};

let view = createClass({
  getInitialState() {
    return {
      isRealSrcApplied: false,
      isLoaded: false,
    };
  },

  componentDidMount() {
    this.unobserveImage = onEnter(this.refs.image, this.showImage);
  },

  showImage() {
    this.setState({ isRealSrcApplied: true });
    this.unobserveImage();
  },

  onLoad() {
    this.setState({ isLoaded: true });
  },

  render() {
    let {
      model,
      dispatch,
      dispatcher,
      shouldKeepRatio = false,
      src, width, height,
      imgProps = {},
      wrapperProps = {},
      className = '',
    } = this.props;

    if (!shouldKeepRatio) {
      return (
        <img
          className={className + ' ' + this.state.isLoaded ? 'is_loaded' : ''}
          ref="image"
          src={this.state.isRealSrcApplied ? src : undefined}
          onLoad={this.onLoad}
          {...imgProps}
        />
      );
    }

    return (
      <div
        className={`lazyImage lazyImage--keepRatio ${className}`}
        style={{ width, maxWidth: '100%' }}
        {...wrapperProps}
      >
        <div
          className="lazyImage_innerWrapper"
          style={{
            position: 'relative',
            width: '100%',
            height: 0,
            paddingBottom: `${(height / width).toFixed(2) * 100}%`,
          }}
        >
          <img
            className={this.state.isLoaded ? 'is_loaded' : ''}
            style={{ position: 'absolute', top: 0, left: 0 }}
            ref="image"
            src={this.state.isRealSrcApplied ? src : undefined}
            onLoad={this.onLoad}
            {...imgProps}
          />
        </div>
      </div>
    );
  },
});



view = createComponent({ name, view, update });
view = createModelHolder(view, init);
export { init, view };