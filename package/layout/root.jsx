import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { view as NavDrawer, init as navDrawerInit, isPopup } from './navDrawer';
import { view as IconButton } from '../buttons/iconButton';
import { view as Slot, getSlotWithName } from '../slot/';
import { init as initScrollState, enableScroll, disableScroll } from '../utils/scrollState';
import { init as initZIndexState } from '../utils/zIndexState';

let name = 'Root';

let init = function() {
  return {
    navDrawerModel: navDrawerInit(),
  };
};

let update = function({ type, payload, model, dispatch }) {
  if (type === 'toggleNavDrawer') {
    let newState = !model.navDrawerModel.isOpen.val();
    model.navDrawerModel.isOpen.set(newState);
    if ( isPopup() ) {
      newState? disableScroll() : enableScroll();
    }
  }
};


let view = React.createClass({
  componentDidMount() {
    initScrollState({
      mainSelector: '.layout_main',
      mainBodySelector: '.layout_main_body',
    });

    initZIndexState(30);
  },

  renderNavDrawerToggle() {
    let { dispatcher } = this.props;
    return (
      <IconButton
        icon="menu"
        onClick={dispatcher('toggleNavDrawer')}
      />
    );
  },

  render() {
    let {
      model,
      children,
      pageElement: rawPageElem,
      appLogo,
      pageElemProps
    } = this.props;

    let pageElement = React.cloneElement(
      rawPageElem,
      {
        ...pageElemProps,
        appLogo,
        navDrawerToggle: this.renderNavDrawerToggle(),
      }
    );

    let navDrawer_header = getSlotWithName(children, true, 'navDrawer_header');
    let navDrawer_body = getSlotWithName(children, true, 'navDrawer_body');
    let navDrawer_footer = getSlotWithName(children, true, 'navDrawer_footer');
    let otherContent = getSlotWithName(children, true, 'other');

    return (
      <div className={`layout ${model.navDrawerModel.isOpen.val() ? 'is_drawerOpen' : ''}`}>
        <NavDrawer
          className="layout_leftAside"
          model={model.navDrawerModel}
        >
          <Slot name="header">{navDrawer_header}</Slot>
          <Slot name="body">{navDrawer_body}</Slot>
          <Slot name="footer">{navDrawer_footer}</Slot>
        </NavDrawer>

        {pageElement}
        {otherContent}
      </div>
    );
  },
});



view = createComponent({ name, view, update });
export { init, view };