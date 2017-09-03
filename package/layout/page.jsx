import React from 'react';
import createClass from 'create-react-class';
import setClassNames from 'classnames';
import createComponent from 'rce-pattern/createComponent';
import { getSlotContent, getSlot } from '../slot/';
import { view as AppBar } from '../appBar/';
import { view as Slot } from '../slot/';
import { init as initScrollState, enableScroll, disableScroll } from '../utils/scrollState';
import { init as initZIndexState } from '../utils/zIndexState';
import throttle from 'lodash/throttle';

let name = 'Page';

let init = function() {};

let update = function({ type, payload, model, dispatch }) {};

let Header = createComponent({
  name: 'PageHeader',
  view({
    header_navButton,
    header_appLogo,
    header_title,
    header_actions,
    contextualBarProps,
    header_other,
  }) {
    return (
      <div className="layout_main_header">
        <AppBar
          className="appBar--shadow globalAppBar"
        >
          <Slot name="navButton">{header_navButton}</Slot>
          <Slot name="title">
            {header_appLogo}
            <div className="appBar_pageTitle">
              {header_title}
            </div>
          </Slot>
          <Slot name="actions">{header_actions}</Slot>
          <Slot {...contextualBarProps} name="contextualBar"/>
          <Slot name="other">{header_other}</Slot>
        </AppBar>
      </div>
    );
  }
});

let Body = createComponent({
  name: 'PageBody',
  view({ body }) {
    return (
      <main className="layout_main_body">
        <div className="layout_main_body_inner">
          {body}
        </div>
      </main>
    );
  }
});

let view = createClass({
  componentDidMount() {
    initScrollState({
      mainSelector: '.layout_main',
      mainBodySelector: '.layout_main_body',
    });

    initZIndexState(30);
  },

  componentWillMount() {
    let { children, variableSlots = [], constantSlots = [] } = this.props;

    let slots = [
      'header_actions',
      'header_navButton',
      'header_appLogo',
      'header_title',
      'header_other',
      'body',
    ];

    let _constantSlots;

    if (variableSlots.length > 0) {
      _constantSlots = slots.filter(i => !variableSlots.includes(i));
    } else {
      _constantSlots = constantSlots;
    }

    let constantSlotsMap = _constantSlots.reduce(function(preVal, slotName) {
      return {
        ...preVal,
        [slotName]: getSlotContent(children, slotName)
      };
    }, {});

    this.getSlotContent = function(children, name) {
      if (constantSlotsMap[name]) {
        return constantSlotsMap[name];
      }

      return getSlotContent(children, name);
    };
  },

  render() {
    let { children, className = '' } = this.props;

    let headerProps = {
      header_navButton: this.getSlotContent(children, 'header_navButton'),
      header_appLogo: this.getSlotContent(children, 'header_appLogo'),
      header_title: this.getSlotContent(children, 'header_title'),
      header_actions: this.getSlotContent(children, 'header_actions'),
      header_other: this.getSlotContent(children, 'header_other'),
      contextualBarProps: getSlot(children, 'header_contextualBar').props,
    };
    let body = this.getSlotContent(children, 'body');
    return (
      <div className={`layout_main ${className}`}>
        <Header {...headerProps}/>
        <Body body={body}/>
      </div>
    );
  },
});


view = createComponent({ name, view, update });
export { init, view };