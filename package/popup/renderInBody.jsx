import React from 'react';
import ReactDOM from 'react-dom';

let RenderInBody = React.createClass({
  componentDidMount() {
    let container = document.createElement('div');
    document.body.appendChild(container);
    this.container = container;
    this.renderPortal();
  },

  componentDidUpdate() {
    this.renderPortal();
  },

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.container);
    this.container.remove();
  },

  renderPortal() {
    ReactDOM.render(<div>{this.props.children}</div>, this.container);
  },

  render() {
    return null;
  },
});

export default RenderInBody;
