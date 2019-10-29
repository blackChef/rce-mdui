import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import { view as NavDrawer, init as navDrawerInit, isPopup } from './navDrawer';
import { view as IconButton } from '../buttons/iconButton';
import { view as Slot, getSlotContent } from '../slot/';
import MdMenu from 'react-icons/lib/md/menu';
import { enableScroll, disableScroll } from '../utils/scrollState';
import './index.scss';


const name = 'Root';

const init = function() {
  return {
    navDrawerModel: navDrawerInit(),
  };
};

const update = function({ model }) {
  const newState = !model.navDrawerModel.isOpen.val();
  model.navDrawerModel.isOpen.set(newState);
  if ( isPopup() ) {
    newState? disableScroll() : enableScroll();
  }
};

let view = createClass({
  renderNavDrawerToggle() {
    const { dispatcher } = this.props;
    return (
      <IconButton
        icon={MdMenu}
        onClick={dispatcher('toggleNavDrawer')}
      />
    );
  },

  render() {
    const {
      model,
      children,
      pageElement: rawPageElem,
      appLogo,
      pageElemProps
    } = this.props;

    const pageElement = React.cloneElement(
      rawPageElem,
      {
        ...pageElemProps,
        appLogo,
        navDrawerToggle: this.renderNavDrawerToggle(),
      }
    );

    const getContent = getSlotContent(children);
    const navDrawer_header = getContent('navDrawer_header');
    const navDrawer_body = getContent('navDrawer_body');
    const navDrawer_footer = getContent('navDrawer_footer');
    const otherContent = getContent('other');

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
export default view;
export { init, view };
