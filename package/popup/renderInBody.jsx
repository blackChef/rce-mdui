import ReactDOM from 'react-dom';
import createClass from 'create-react-class';

let RenderInBody = createClass({
  displayName: 'RenderInBody',

  render() {
    let { children } = this.props;
    return ReactDOM.createPortal(children, document.body);
  },
});

export default RenderInBody;
