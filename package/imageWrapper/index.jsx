import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import createModelHolder from 'rce-pattern/createModelHolder';
import { onEnter } from './intersectionObserver';
import setClassName from 'classnames';
import './index.scss';


const name = 'ImageWrapper';

const init = function() {};

const Placeholder = createComponent({
  view({ width, height }) {
    return <canvas className="imageWrapper_placeholder" width={width} height={height}/>;
  }
});

let view = createClass({
  getInitialState() {
    return {
      shouldShowImage: false,
      isLoaded: false,
      naturalWidth: -1,
      naturalHeight: -1,
    };
  },

  componentDidMount() {
    this.unobserveImage = onEnter(this.containerRef, this.showImage);
  },

  componentWillUnmount() {
    this.isUnmounted = true;
  },

  showImage() {
    this.unobserveImage();
    !this.isUnmounted && this.setState({ shouldShowImage: true });
  },

  onLoad(event) {
    if (!this.isUnmounted) {
      const { naturalWidth, naturalHeight } = event.target;
      this.setState({
        isLoaded: true,
        naturalWidth, naturalHeight,
      });
    }
  },

  render() {
    const {
      src, width, height,
      alt = '',
      imgProps = {},
      wrapperProps = {},
      className = '',
      lazy = true,
      cover = true,
    } = this.props;

    const {
      shouldShowImage,
      isLoaded,
      naturalWidth,
      naturalHeight,
    } = this.state;

    const classNames = setClassName(`imageWrapper ${className}`, {
      is_loaded: isLoaded
    });

    const imgSrc = (() => {
      if (!lazy) return src;
      if (shouldShowImage) return src;
      return '';
    })();

    const imgStyle = (() => {
      if (!cover) return { width: `${width}px`, height: `${height}px` };
      const targetRatio = width / height;
      const naturalRatio = naturalWidth / naturalHeight;
      if (naturalRatio > targetRatio) {
        return { width: `auto`, height: `100%` };
      }

      return { width: `100%`, height: `auto` };
    })();

    return (
      <div
        className={classNames}
        ref={e => this.containerRef = e}
        {...wrapperProps}
        data-src={src}
      >
        <Placeholder width={width} height={height}/>

        <img
          {...imgProps}
          src={imgSrc}
          onLoad={this.onLoad}
          alt={alt}
          style={imgStyle}
        />
      </div>
    );
  },
});



view = createComponent({ name, view });
view = createModelHolder(view, init);
export default view;
export { init, view };
