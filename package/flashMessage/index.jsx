import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import setClassNames from 'classnames';
import { matchValues } from '../utils/checkProps';
import { increaseDepth, decreaseDepth } from '../utils/zIndexState';



let name = 'flashMessage';

let init = function() {
  return false;
};

let update = function({ model }) {
  model.set(false);
};

let view = createClass({
  componentDidUpdate(prevProps) {
    let { dispatch, timeout = 1500 } = this.props;

    let willShow = matchValues(
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
    let { model, msg, message = msg, className = '' } = this.props;
    let popupClassName = setClassNames(`flashMessage ${className}`, {
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
export { init, view };