import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import { getSlotContent, getSlot } from '../slot/';
import { view as AppBar } from '../appBar/';
import { view as Slot } from '../slot/';
import { view as Icon } from '../icon/';
import { init as initScrollState } from '../utils/scrollState';
import { init as initZIndexState } from '../utils/zIndexState';
import MdChevronRight from 'react-icons/lib/md/chevron-right';


let name = 'Page';

let init = function() {};

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
          className="globalAppBar"
        >
          <Slot name="navButton">{header_navButton}</Slot>
          <Slot name="title">
            {
              header_appLogo.length ?
              <div>
                {header_appLogo}
                <Icon icon={MdChevronRight} className="mdIcon--inheritColor side_gutter_margin"/>
              </div> : null
            }
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
      <div className="layout_main_body">
        <div className="layout_main_body_inner">
          {body}
        </div>
      </div>
    );
  }
});

let view = createClass({
  componentDidMount() {
    let { scrollStateProps = {} } = this.props;
    initScrollState({
      mainSelector: '.layout_main',
      mainBodySelector: '.layout_main_body',
      ...scrollStateProps
    });
    initZIndexState(30);
  },

  UNSAFE_componentWillMount() {
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
    let { children, className = '', noHeader = false } = this.props;

    let header = (() => {
      if (noHeader) return null;

      let headerProps = {
        header_navButton: this.getSlotContent(children, 'header_navButton'),
        header_appLogo: this.getSlotContent(children, 'header_appLogo'),
        header_title: this.getSlotContent(children, 'header_title'),
        header_actions: this.getSlotContent(children, 'header_actions'),
        header_other: this.getSlotContent(children, 'header_other'),
        contextualBarProps: getSlot(children, 'header_contextualBar').props,
      };

      return <Header {...headerProps}/>;
    })();

    let body = this.getSlotContent(children, 'body');
    let other = this.getSlotContent(children, 'other');

    return (
      <div className={`layout_main ${className}`}>
        {header}
        <Body body={body}/>
        {other}
      </div>
    );
  },
});


view = createComponent({ name, view });
export default view;
export { init, view };
