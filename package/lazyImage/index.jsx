import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import createModelHolder from 'rce-pattern/createModelHolder';
import { onEnter } from './intersectionObserver';



let name = 'LazyImage';

let init = function() {};

let update = function({ type, payload, model, dispatch, getLatestModel }) {};

let Placeholder = createComponent({
  view({ width, height }) {
    return <canvas className="lazyImage_placeholder" width={width} height={height}/>;
  }
});

let view = createClass({
  getInitialState() {
    return {
      shouldShowImage: false,
      isLoaded: false,
    };
  },

  componentDidMount() {
    this.unobserveImage = onEnter(this.refs.container, this.showImage);
  },

  showImage() {
    this.setState({ shouldShowImage: true });
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
      src, width, height,
      imgProps = {},
      wrapperProps = {},
      className = '',
    } = this.props;

    let { shouldShowImage, isLoaded } = this.state;

    return (
      <div
        className={`lazyImage ${className}`}
        ref="container"
        {...wrapperProps}
      >
        <Placeholder width={width} height={height}/>

        <img
          className={isLoaded ? 'is_loaded' : ''}
          src={shouldShowImage ? src : ''}
          onLoad={this.onLoad}
          width={width}
          height={height}
          {...imgProps}
        />
      </div>
    );
  },
});



view = createComponent({ name, view, update });
view = createModelHolder(view, init);
export { init, view };