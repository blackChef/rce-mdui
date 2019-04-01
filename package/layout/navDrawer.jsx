import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import { enableScroll, disableScroll } from '../utils/scrollState';
import debounce from 'lodash/debounce';
import {getSlotContent } from '../slot/';
import matchScreenSize from '../utils/matchScreenSize';
import './navDrawer.scss';


let name = 'NavDrawer';

let isPopup = () => !matchScreenSize('large');

let init = function() {
  return {
    isOpen: !isPopup(),
  };
};

let update = function({ model }) {
  model.isOpen.set(false);
  if ( isPopup() ) {
    enableScroll();
  }
};

let view = createClass({
  getInitialState() {
    return {
      isPopup: isPopup()
    };
  },

  componentDidMount() {
    this.toggleScrollWhenLayoutChange = debounce(() => {
      let { model } = this.props;
      let curIsPopup = isPopup();
      let prevIsPopup = this.state.isPopup;

      this.setState({ isPopup: curIsPopup });

      let isOpen = model.isOpen.val();

      if (!isOpen) return;

      if (prevIsPopup && !curIsPopup) {
        enableScroll();
      } else if (!prevIsPopup && curIsPopup) {
        disableScroll();
      }
    }, 400);

    window.addEventListener('resize', this.toggleScrollWhenLayoutChange);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.toggleScrollWhenLayoutChange);
  },

  closeDrawerBeforeDispatchClick(event) {
    if ( isPopup() ) {
      let { dispatch } = this.props;
      let { frontRef } = this;
      let { currentTarget } = event;

      event.preventDefault();
      dispatch('close');

      let dispatchClick = function() {
        currentTarget.dispatchEvent( new MouseEvent('click') );
        frontRef.removeEventListener('transitionend', dispatchClick);
      };

      frontRef.addEventListener('transitionend', dispatchClick, false);
    }
  },

  cloneChildrenWithProps(children) {
    let { closeDrawerBeforeDispatchClick } = this;
    let childProps = { closeDrawerBeforeDispatchClick };

    return React.Children.map(
      children,
      child => React.cloneElement(child, childProps)
    );
  },

  render() {
    let {
      className = '',
      dispatcher,
      children
    } = this.props;

    let { cloneChildrenWithProps } = this;

    let header = cloneChildrenWithProps(
      getSlotContent(children, 'header')
    );

    let body = cloneChildrenWithProps(
      getSlotContent(children, 'body')
    );

    return (
      <aside className={`navDrawer ${className}`}>
        <div ref={e => this.frontRef = e} className="navDrawer_front">
          <div className="navDrawer_front_header">
            {header}
          </div>

          <div className="navDrawer_front_body">
            {body}
          </div>
        </div>

        <div className="navDrawer_background" onClick={dispatcher('close')}/>
      </aside>
    );
  },
});

view = createComponent({ name, view, update });
export { init, view, isPopup };