import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { getSlots } from '../slot/';
import { view as Transition } from '../transition/appear';

let name = 'tabs_remount';

let init = function() {
  return 0; //active index
};

let update = function({ type, payload, model, dispatch }) {
  if (type == 'changeTab') {
    model.set(payload);
  }
};

let view = React.createClass({
  render() {
    let { model, dispatch, dispatcher, children, className = '' } = this.props;
    let tabPanes = getSlots(children, 'tabPane');
    let curIndex = model.val();

    let headerItems = tabPanes.map(function(item, index) {
      return (
        <div
          key={index}
          className={`tabs_nav_item ${index === curIndex ? 'is_active' : ''}`}
          onClick={() => dispatch('changeTab', index)}
        >
          {item.props.label}
        </div>
      );
    });

    return (
      <div className={`tabs ${className}`}>
        <div className="tabs_nav">
          {headerItems}
        </div>

        <div className="tabs_body">
          <Transition
            name="slideUp"
            className="tabs_body_item is_active"
            key={curIndex}
          >
            {tabPanes[curIndex].props.children}
          </Transition>
        </div>
      </div>
    );
  },
});



view = createComponent({ name, view, update });
export { init, view };

