import React from 'react';
import createClass from 'create-react-class';
import noop from 'lodash/noop';
import createComponent from 'rce-pattern/createComponent';
import createModelHolder from 'rce-pattern/createModelHolder';
import { view as Tether } from '../tether/';
import checkIsHoverable from '../utils/isHoverable';
import './index.scss';


const name = 'Menu';

const init = function() {
  return false;
};

const isHoverable = checkIsHoverable();

const Popup = function({ isShown, msg }) {
  return (
    <div className={`tooltip ${isShown ? 'is_active' : ''}`}>
      <div className="tooltip_front">{msg}</div>
    </div>
  );
};

const showPopupIfHoverable = showPopup => isHoverable ? showPopup : noop;

const Trigger = function(props) {
  const {
    showPopup,
    hidePopup,
    msg,
    children
  } = props;

  return (
    <div
      className="tooltip_trigger"
      onMouseEnter={showPopupIfHoverable(showPopup)}
      onMouseLeave={hidePopup}
      onMouseDown={hidePopup}
      title={isHoverable? '' : msg}
    >
      <div className="tooltip_trigger_inner">
        {children}
      </div>
    </div>
  );
};

let view = createClass({
  render() {
    return (
      <Tether
        {...this.props}
        shouldDisableScroll={false}
        trigger={<Trigger {...this.props}/>}
        popup={<Popup {...this.props}/>}
      />
    );
  },
});


view = createComponent({ name, view });
view = createModelHolder(view, init());
export default view;
export { init, view };
