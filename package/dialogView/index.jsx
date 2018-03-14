import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import { getSlotContent } from '../slot/';
import { view as AppBar } from '../appBar/';
import { view as Slot } from '../slot/';
import { view as IconButton } from '../buttons/iconButton';
import { view as Popup } from '../popup/';
import CloseIcon from 'react-icons/lib/md/close';



let name = 'DialogView';

let init = function() {
  return false;
};

let Front = function(props) {
  let {
    children,
    appBarProps = { className: 'appBar--shadow' },
    forceOpen,
    tryToClose,
    navButtonIcon = CloseIcon
  } = props;

  let body = getSlotContent(children, 'body');

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
    document.body.classList.add('is_dialogViewOpen');
    this.props.onOpen && this.props.onOpen();
  },

  onClose() {
    document.body.classList.remove('is_dialogViewOpen');
    this.props.close && this.props.close();
  },

  render() {
    let {
      model,
      className = '',
      ...otherProps
    } = this.props;

    return (
      <Popup
        {...otherProps}
        onOpen={this.onOpen}
        onClose={this.onClose}
        className={`dialogView ${className}`}
        model={model}
        openAnimationDuration={350}
        closeAnimationDuration={350}
        bgProps={{ className: 'dialogView_background' }}
      >
        <Front {...this.props} />
      </Popup>
    );
  },
});


view = createComponent({ name, view });
export { init, view };