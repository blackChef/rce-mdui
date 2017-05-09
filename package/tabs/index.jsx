import React from 'react';
import curry from 'lodash/curry';
import _map from 'lodash/map';
import { getSlotWithName } from '../slot/';
import createComponent from 'rce-pattern/createComponent';

let map = curry(_map);

let name = 'tabs';

let init = function() {
  return 0; //active index
};

let update = function({ type, payload, model, dispatch }) {
  if (type == 'changeTab') {
    model.set(payload);
  }
};


let setClassName = function(suffix, model, index) {
  if (index == model.val()) {
    return 'is_active ' + suffix;
  } else {
    return suffix;
  }
};

let getTabIndex = event => event.currentTarget.dataset.tabIndex;

let renderHeader = curry(function(model, dispatcher, item, index) {
  return (
    <div
      key={index}
      data-tab-index={index}
      className={setClassName('tabs_nav_item', model, index)}
      onClick={dispatcher('changeTab', getTabIndex)}
    >
      {item.props.label}
    </div>
  );
});

let renderBody = curry(function(model, item, index) {
  return (
    <div
      key={index}
      data-tab-index={index}
      className={setClassName('tabs_body_item', model, index)}
    >
      {item.props.children}
    </div>
  );
});

let view = React.createClass({
  componentDidUpdate(prevProps) {
    let targetIndex = this.props.model.val();
    let curIndex = prevProps.model.val();
    if (targetIndex === curIndex) return;


    let { nav, body } = this.refs;

    // navItem use ripple, ref to navItem wont work
    let targetPane = body.querySelector(`[data-tab-index="${targetIndex}"]`);
    let curPane = body.querySelector(`[data-tab-index="${curIndex}"]`);

    if (!targetPane || !curPane) return;

    curPane.classList.remove('slideUp', 'slideUp_active');
    targetPane.classList.add('slideUp');

    setTimeout(function() {
      targetPane.classList.add('slideUp_active');
    }, 20);
  },

  render() {
    let { model, dispatch, dispatcher, children, className = '' } = this.props;
    let tabPanes = getSlotWithName(children, false, 'tabPane');
    let mapTabpanes = map(tabPanes);

    return (
      <div className={`tabs ${className}`}>
        <div ref="nav" className="tabs_nav">
          {mapTabpanes(renderHeader(model, dispatcher))}
        </div>

        <div ref="body" className="tabs_body">
          {mapTabpanes(renderBody(model))}
        </div>
      </div>
    );
  },
});



view = createComponent({ name, view, update });
export { init, view };

