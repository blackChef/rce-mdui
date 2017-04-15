import React from 'react';
import setClassNames from 'classnames';
import createComponent from 'rce-pattern/createComponent';
import { getSlotWithName } from '../slot/';
import { view as AppBar } from '../appBar/';
import { view as Slot } from '../slot/';


let name = 'Page';

let init = function() {};

let update = function({ type, payload, model, dispatch }) {};

let view = function({ model, dispatch, dispatcher, children }) {
  let getSlot = getSlotWithName(children, true);
  let header_actions = getSlot('header_actions');
  let header_navButton = getSlot('header_navButton');
  let header_appLogo = getSlot('header_appLogo');
  let header_title = getSlot('header_title');
  let header_other = getSlot('header_other');
  let body = getSlot('body');

  let contextualBarProps = getSlotWithName(
    children, false, 'header_contextualBar'
  )[0].props;

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