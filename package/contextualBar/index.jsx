import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import { getSlotContent } from '../slot/';
import setClassNames from 'classnames';
import { view as IconButton } from '../buttons/iconButton';
import addESCListener from '../utils/escState';
import MdClose from 'react-icons/lib/md/close';
import './index.scss';


let name = 'ContextualBar';

let init = function() {};

let renderActionItem = function(item, index) {
  return <div key={index} className="contextualBar_actions_item">{item}</div>;
};

let renderActionsForSingleItem = function(count, children) {
  if (count === 1) {
    let slots = getSlotContent(children, 'single');

    return (
      <div className="contextualBar_actions_single">
        {slots.map(renderActionItem)}
      </div>
    );
  }
};

let renderActionsForMultipleItems = function(count, children) {
  if (count > 0) {
    let slots = getSlotContent(children, 'multiple');

    return (
      <div className="contextualBar_actions_multiple">
        {slots.map(renderActionItem)}
      </div>
    );
  }
};

let Count = createClass({
  shouldComponentUpdate(nextProps) {
    // we don't want to see count number changes into 0
    if (nextProps.count === 0) {
      return false;
    }

    return true;
  },
  render() {
    let { count } = this.props;
    return (
      <div className="contextualBar_control_count">
        <div className="contextualBar_control_count_prefix">已选择</div>
        {count}
        <div className="contextualBar_control_count_suffix">项</div>
      </div>
    );
  },
});

let view = createClass({
  componentDidMount() {
    let isCurActive = this.props.count > 0;
    if (isCurActive) {
      this.removeESCListener = addESCListener(this.props.onRequestDeselectAll);
    }
  },
  componentDidUpdate(prevProps) {
    let isGotoActive = prevProps.count === 0 && this.props.count > 0;
    let isGotoInactive = prevProps.count > 0 && this.props.count === 0;

    if (isGotoActive && !this.removeESCListener) {
      this.removeESCListener = addESCListener(this.props.onRequestDeselectAll);
    }

    if (isGotoInactive) {
      this.removeESCListener();
    }
  },
  render() {
    let { children, count, onRequestDeselectAll, className = '' } = this.props;

    if (!children) return null;

    let classNames = setClassNames(`contextualBar ${className}`, {
      'is_active': count > 0,
    });

    return (
      <div className={classNames}>
        <div className="contextualBar_control">
          <IconButton
            className="contextualBar_control_closeButton iconButton--white"
            icon={MdClose}
            onClick={onRequestDeselectAll}
          />
          <Count count={count}/>
        </div>

        <div className="contextualBar_actions">
          { renderActionsForMultipleItems(count, children) }
          { renderActionsForSingleItem(count, children) }
        </div>
      </div>
    );
  },
});

view = createComponent({ name, view });
export default view;
export { init, view };
