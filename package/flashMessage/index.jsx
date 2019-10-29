import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import setClassNames from 'classnames';
import { matchValues } from '../utils/checkProps';
import { increaseDepth, decreaseDepth } from '../utils/zIndexState';
import './index.scss';



const name = 'flashMessage';

const init = function() {
  return false;
};

const update = function({ model }) {
  model.set(false);
};

let view = createClass({
  componentDidUpdate(prevProps) {
    const { dispatch, timeout = 1500 } = this.props;

    const willShow = matchValues(
      'model.val', this.props, prevProps,
      true, false
    );

    if (willShow) {
      increaseDepth(this.mainRef);
      setTimeout(function() {
        dispatch('hide');
        decreaseDepth(this.mainRef);
      }, timeout);
    }
  },

  componentDidMount() {
    document.body.appendChild(this.mainRef);
  },

  componentWillUnmount() {
    this.mainRef.remove();
  },

  render() {
    const { model, msg, message = msg, className = '' } = this.props;
    const popupClassName = setClassNames(`flashMessage ${className}`, {
      'is_active': model.val()
    });

    return (
      <div className="flashMessage_placeholder" style={{ display: 'none' }}>
        <div className={popupClassName} ref={e => this.mainRef = e}>
          <div className="flashMessage_front">{message}</div>
        </div>
      </div>
    );
  },
});



view = createComponent({ name, view, update });
export default view;
export { init, view };
