import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import { getSlotContent } from '../slot/';
import { view as AppBar } from '../appBar/';
import { view as Slot } from '../slot/';
import { view as IconButton } from '../buttons/iconButton';
import { view as Popup } from '../popup/';
import CloseIcon from 'react-icons/lib/md/close';
import './index.scss';



const name = 'DialogView';

const init = function() {
  return false;
};

const Front = function(props) {
  const {
    children,
    appBarProps = { className: 'appBar--shadow' },
    forceOpen,
    tryToClose,
    navButtonIcon = CloseIcon
  } = props;

  const body = getSlotContent(children, 'body');

  return (
    <div className="dialogView_front">
      <AppBar
        {...appBarProps}
        className={`dialogView_front_header ${appBarProps.className}`}
      >
        <Slot name="navButton">
          <IconButton
            icon={navButtonIcon}
            disabled={forceOpen}
            onClick={tryToClose}
          />
        </Slot>

        {children}
      </AppBar>

      <div className="dialogView_front_body">
        {body}
      </div>
    </div>
  );
};


let view = createClass({
  onOpen() {
    // If a dialogView already add class to body,
    // we leave that dialogView to control body's class.
    if (!document.body.classList.contains('is_dialogViewOpen')) {
      document.body.classList.add('is_dialogViewOpen');
      this.addClassTobody = true;
    }

    this.props.onOpen && this.props.onOpen();
  },

  onClose() {
    if (this.addClassTobody) {
      document.body.classList.remove('is_dialogViewOpen');
    }
    this.props.close && this.props.close();
  },

  render() {
    const {
      model,
      className = '',
      ...otherProps
    } = this.props;

    return (
      <Popup
        openAnimationDuration={300}
        closeAnimationDuration={300}
        {...otherProps}
        onOpen={this.onOpen}
        onClose={this.onClose}
        className={`dialogView ${className}`}
        model={model}
        bgProps={{ className: 'dialogView_background' }}
      >
        <Front {...this.props} />
      </Popup>
    );
  },
});


view = createComponent({ name, view });
export default view;
export { init, view };
