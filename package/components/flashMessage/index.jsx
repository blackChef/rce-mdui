import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { openPopup } from '../popup/popupStack';
import { default as setClassNames } from 'classnames';
import checkProps from '../utils/checkProps';



let name = 'flashMessage';

let init = function() {
  return false;
};

let update = function({ type, payload, model, dispatch }) {
  if (type == 'hide') {
    model.set(false);
    payload(200);
  }
};

let view = React.createClass({
  componentWillReceiveProps(nextProps) {
    let checkShow = checkProps('model.val', this.props, nextProps);
    let willShow = checkShow(false, true);
    let { dispatch, timeout = 1500 } = this.props;

    if (willShow) {
      let { main } = this.refs;
      let closePopup = openPopup(main, false);
      setTimeout(() => dispatch('hide', closePopup), timeout);
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