import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import { getSlots } from '../slot/';
import { view as Transition } from '../transition/appear';
import './index.scss';


const name = 'tabs_remount';

const init = function() {
  return 0; //active index
};

const update = function({ payload, model }) {
  model.set(payload);
};

let view = createClass({
  componentDidUpdate() {
    const { model, children, dispatch } = this.props;
    const tabPanes = getSlots(children, 'tabPane');
    const curIndex = model.val();
    if (curIndex > tabPanes.length - 1) {
      dispatch('changeTab', tabPanes.length - 1);
    }
  },
  render() {
    const {
      model,
      dispatch,
      children,
      className = '',
      transitionName = 'slideUp'
    } = this.props;
    const tabPanes = getSlots(children, 'tabPane');
    const curIndex = model.val();

    const headerItems = tabPanes.map(function(item, index) {
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
    const curPane = curIndex > tabPanes.length - 1 ?
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
export default view;
export { init, view };


