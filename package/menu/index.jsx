import React from 'react';
import createClass from 'create-react-class';
import noop from 'lodash/noop';
import createComponent from 'rce-pattern/createComponent';
import createModelHolder from 'rce-pattern/createModelHolder';
import { getSlots } from '../slot/';
import { view as Tether } from '../tether/';
import { view as IconButton } from '../buttons/iconButton';
import MdMoreVert from 'react-icons/lib/md/more-vert';
import './index.scss';


const name = 'Menu';

const init = function() {
  return false;
};

const Popup = function({ hidePopup, isShown, children }) {
  const items = getSlots(children, 'item')
    .map(function(item, index) {
      const {
        onClick = noop,
        children,
        Component = 'div',
        className = '',
        ...otherProps
      } = item.props;
      const onItemClick = () => { onClick(); hidePopup(); };
      return (
        <Component
          key={index}
          onClick={onItemClick}
          className={'menu_item ' + className}
          {...otherProps}
        >
          {children}
        </Component>
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

const Trigger = function(props) {
  const {
    triggerElement = <IconButton icon={MdMoreVert}/>,
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
    const { fullWidth } = this.props;
    if (fullWidth) {
      popupDOM.style.width = `${triggerDOM.clientWidth}px`;
    }
  },
  render() {
    const { fullWidth } = this.props;
    const attachment = fullWidth ? 'top center' : 'top right';
    const targetAttachment = fullWidth ? 'bottom center' : 'top right';

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


view = createComponent({ name, view });
view = createModelHolder(view, init());
export default view;
export { init, view };
