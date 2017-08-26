import React from 'react';
import createClass from 'create-react-class';
import setClassNames from 'classnames';
import createComponent from 'rce-pattern/createComponent';
import { getSlotContent, getSlot } from '../slot/';
import { view as AppBar } from '../appBar/';
import { view as Slot } from '../slot/';
import debounce from 'lodash/debounce';

let name = 'Page';

let init = function() {};

let update = function({ type, payload, model, dispatch }) {};

let view = createClass({
  componentDidMount() {
    let { autoHideHeader = false } = this.props;
    if (!autoHideHeader) return;

    let prevSt = 0;
    let { header } = this.refs;
    let setHeaderState = function(state) {
      header.dataset.scrollState = state;
    };

    let throttle = 5;

    this.onScroll = debounce(function() {
      let curSt = window.scrollY;
      let diff = curSt - prevSt;
      prevSt = curSt;

      if (curSt === 0) {
        setHeaderState('is_topEdge');
      }

      else if (
        curSt + window.innerHeight === document.documentElement.scrollHeight
      ) {
        setHeaderState('is_bottomEdge');
      }

      else if (diff > throttle) {
        setHeaderState('is_scrollDown');
      }

      else if (diff < -throttle) {
        setHeaderState('is_scrollUp');
      }
    }, 100, { leading: true });

    window.addEventListener('scroll', this.onScroll, false);
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },

  render() {
    let { model, dispatch, dispatcher, children } = this.props;
    let getContent = getSlotContent(children);
    let header_actions = getContent('header_actions');
    let header_navButton = getContent('header_navButton');
    let header_appLogo = getContent('header_appLogo');
    let header_title = getContent('header_title');
    let header_other = getContent('header_other');
    let body = getContent('body');
    let contextualBarProps = getSlot(children, 'header_contextualBar').props;

    return (
      <div className="layout_main">
        <div className="layout_main_header" ref="header">
          <AppBar className="appBar--shadow globalAppBar">
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

        <main className="layout_main_body">
          <div className="layout_main_body_inner">
            {body}
          </div>
        </main>
      </div>
    );
  },
});


view = createComponent({ name, view, update });
export { init, view };