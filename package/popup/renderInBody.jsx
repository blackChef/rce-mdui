import React from 'react';
import ReactDOM from 'react-dom';
import createClass from 'create-react-class';
import noop from 'lodash/noop';

let RenderInBody = createClass({
  displayName: 'RenderInBody',

  componentDidMount() {
    let { hookElem = noop} = this.props;
    let container = document.createElement('div');
    document.body.appendChild(container);
    this.container = container;
    this.renderPortal();
    hookElem(container);
  },

  componentDidUpdate() {
    this.renderPortal();
  },

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.container);
    this.container.remove();
  },

  renderPortal() {
    let { children, hookElem, ...otherProps } = this.props;
    ReactDOM.render(<div {...otherProps}>{children}</div>, this.container);
  },

  render() {
    return null;
  },
});

export default RenderInBody;
