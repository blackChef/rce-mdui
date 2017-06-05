import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import setClassNames from 'classnames';
import { matchValues } from '../utils/checkProps';
import { increaseDepth, decreaseDepth } from '../utils/zIndexState';



let name = 'flashMessage';

let init = function() {
  return false;
};

let update = function({ type, payload, model, dispatch }) {
  if (type === 'hide') {
    model.set(false);
  }
};

let view = React.createClass({
  componentWillReceiveProps(nextProps) {
    let { dispatch, timeout = 1500 } = this.props;

    let willShow = matchValues(
      'model.val', this.props, nextProps,
      false, true
    );

    if (willShow) {
      let { main } = this.refs;
      increaseDepth(main);
      setTimeout(function() {
        dispatch('hide');
        decreaseDepth(main);
      }, timeout);
    }
  },

  componentDidMount() {
    document.body.appendChild(this.refs.main);
  },

  componentWillUnmount() {
    this.refs.main.remove();
  },

  render() {
    let { model, dispatch, msg, className = '' } = this.props;
    let popupClassName = setClassNames(`flashMessage ${className}`, {
      'is_active': model.val()
    });

    return (
      <div className="flashMessage_placeholder" style={{ display: 'none' }}>
        <div className={popupClassName} ref="main">
          <div className="flashMessage_front">{msg}</div>
        </div>
      </div>
    );
  },
});



view = createComponent({ name, view, update });
export { init, view };