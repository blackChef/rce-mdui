import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import { enableScroll, disableScroll } from '../utils/scrollState';
import debounce from 'lodash/debounce';
import {getSlotContent } from '../slot/';
import matchScreenSize from '../utils/matchScreenSize';
import './navDrawer.scss';


const name = 'NavDrawer';

const isPopup = () => !matchScreenSize('large');

const init = function() {
  return {
    isOpen: !isPopup(),
  };
};

const update = function({ model }) {
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
      const { model } = this.props;
      const curIsPopup = isPopup();
      const prevIsPopup = this.state.isPopup;

      this.setState({ isPopup: curIsPopup });

      const isOpen = model.isOpen.val();

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
      const { dispatch } = this.props;
      const { frontRef } = this;
      const { currentTarget } = event;

      event.preventDefault();
      dispatch('close');

      const dispatchClick = function() {
        currentTarget.dispatchEvent( new MouseEvent('click') );
        frontRef.removeEventListener('transitionend', dispatchClick);
      };

      frontRef.addEventListener('transitionend', dispatchClick, false);
    }
  },

  cloneChildrenWithProps(children) {
    const { closeDrawerBeforeDispatchClick } = this;
    const childProps = { closeDrawerBeforeDispatchClick };

    return React.Children.map(
      children,
      child => React.cloneElement(child, childProps)
    );
  },

  render() {
    const {
      className = '',
      dispatcher,
      children
    } = this.props;

    const { cloneChildrenWithProps } = this;

    const header = cloneChildrenWithProps(
      getSlotContent(children, 'header')
    );

    const body = cloneChildrenWithProps(
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