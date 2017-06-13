import React from 'react';
import setClassNames from 'classnames';
import createComponent from 'rce-pattern/createComponent';
import { getSlotContent, getSlot } from '../slot/';
import { view as AppBar } from '../appBar/';
import { view as Slot } from '../slot/';


let name = 'Page';

let init = function() {};

let update = function({ type, payload, model, dispatch }) {};

let view = function({ model, dispatch, dispatcher, children }) {
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
      <div className="layout_main_header">
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
};


view = createComponent({ name, view, update });
export { init, view };