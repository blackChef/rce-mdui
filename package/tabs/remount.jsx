import React from 'react';
import createClass from 'create-react-class';
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

let view = createClass({
  componentWillReceiveProps(nextProps) {
    // if count of tabPanes changes
    let { model, children, dispatch } = nextProps;
    let tabPanes = getSlots(children, 'tabPane');
    let curIndex = model.val();
    if (curIndex > tabPanes.length - 1) {
      dispatch('changeTab', tabPanes.length - 1);
    }
  },
  render() {
    let { model, dispatch, dispatcher, children, className = '', transitionName = 'slideUp' } = this.props;
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

    // model may not change now
    let curPane = curIndex > tabPanes.length - 1 ?
      tabPanes[tabPanes.length - 1].props.children :
      tabPanes[curIndex].props.children;

    return (
      <div className={`tabs ${className}`}>
        <div className="tabs_nav">
          {headerItems}
        </div>

        <div className="tabs_body">
          <Transition
            name={transitionName}
            className="tabs_body_item is_active"
            key={curIndex}
          >
            {curPane}
          </Transition>
        </div>
      </div>
    );
  },
});



view = createComponent({ name, view, update });
export { init, view };

