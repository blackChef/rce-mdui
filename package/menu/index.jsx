import React from 'react';
import createClass from 'create-react-class';
import noop from 'lodash/noop';
import createComponent from 'rce-pattern/createComponent';
import createModelHolder from 'rce-pattern/createModelHolder';
import { getSlots } from '../slot/';
import { view as Tether } from '../tether/';
import { view as IconButton } from '../buttons/iconButton';
import MdMoreVert from 'react-icons/lib/md/more-vert';


let name = 'Menu';

let init = function() {
  return false;
};

let update = function({ type, payload, model, dispatch }) {};


let Popup = function({ hidePopup, isShown, children }) {
  let items = getSlots(children, 'item')
    .map(function(item, index) {
      let { onClick = noop, children } = item.props;
      let onItemClick = () => { onClick(); hidePopup(); };
      return (
        <div
          key={index}
          onClick={onItemClick}
          className="menu_item"
        >
          {children}
        </div>
      );
    });

  return (
    <div className={`menu ${isShown ? 'is_active' : ''}`}>
      <div className="menu_front">
        {items}
      </div>
      <div onClick={hidePopup} className="menu_background"></div>
    </div>
  );
};

let Trigger = function(props) {
  let {
    triggerElement = <IconButton icon={MoreVert}/>,
    showPopup,
  } = props;

  return (
    <div className="menu_trigger">
      <div
        className="menu_trigger_inner"
        onClick={showPopup}
      >
        {triggerElement}
      </div>
    </div>
  );
};

let view = createClass({
  stretch({ popupDOM, triggerDOM }) {
    let { fullWidth } = this.props;
    if (fullWidth) {
      popupDOM.style.width = `${triggerDOM.clientWidth}px`;
    }
  },
  render() {
    let { fullWidth } = this.props;
    let attachment = fullWidth ? 'top center' : 'top right';
    let targetAttachment = fullWidth ? 'bottom center' : 'top right';

    return (
      <Tether
        attachment={attachment}
        targetAttachment={targetAttachment}
        {...this.props}
        beforeShow={this.stretch}
        trigger={<Trigger {...this.props}/>}
        popup={<Popup {...this.props}/>}
      />
    );
  },
});


view = createComponent({ name, view, update });
view = createModelHolder(view, init());
export { init, view };