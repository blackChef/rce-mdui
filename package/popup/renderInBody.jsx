import ReactDOM from 'react-dom';
import createClass from 'create-react-class';

const RenderInBody = createClass({
  displayName: 'RenderInBody',

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, document.body);
  },
});

export default RenderInBody;
