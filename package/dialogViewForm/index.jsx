import React from 'react';
import createClass from 'create-react-class';
import noop from 'lodash/noop';
import createComponent from 'rce-pattern/createComponent';
import { view as Transition } from '../transition/appear';
import { view as DialogView } from '../dialogView/';
import { view as Slot } from '../slot/';
import { view as LinkButton } from '../buttons/linkButton';
import { view as PopupForm, init as popupFormInit } from '../popupForm/';

const name = 'DialogViewForm';
const init = popupFormInit;
const update = noop;

const renderMsg = function(model) {
  if (model.isInvalid.val()) {
    return (
      <aside className="infoBanner infoBanner--error">
        {model.invalidMsg.val()}
      </aside>
    );
  }
};

const renderContent = function(props) {
  const {
    model,
    content,
    getData,
    Form,
    transitionType = 'slideUp'
  } = props;

  const { isContentReady, isOpenAnimationEnd } = model.val();

  if (isContentReady && isOpenAnimationEnd) {
    const body = React.cloneElement(content, {
      reloadDialog: getData,
      model: model.content,
      selectOptions: model.selectOptions,
      cursorProps: ['selectOptions'],
    });

    return (
      <Transition name={transitionType}>
        <Form>
          {renderMsg(model)}
          {body}
        </Form>
      </Transition>
    );
  }
};

const Body = createClass({
  afterClose() {
    const {
      model,
      resetModelAfterClose = false,
      afterOpen = noop,
    } = this.props;

    if (resetModelAfterClose) {
      model.set( init() );
    }

    afterOpen();
  },
  render() {
    const {
      model, title, saveBtnProps = {},
      formId, onOpen, afterOpen, LoadingScreen,
      saveBtnLabel = '保存',
      noSaveButton=false,
      // eslint-disable-next-line no-unused-vars
      resetModelAfterClose,
      ...otherProps
    } = this.props;

    const {
      isSaving,
      isContentReady,
    } = model.val();

    return (
      <DialogView
        {...otherProps}
        model={model.show}
        onOpen={onOpen}
        afterOpen={afterOpen}
        forceOpen={isSaving}
        afterClose={this.afterClose}
      >
        <Slot name="title">{title}</Slot>

        <Slot name="actions">
          {
            !noSaveButton &&
            <LinkButton
              {...saveBtnProps}
              disabled={!isContentReady || isSaving || saveBtnProps.disabled}
              form={formId}
              type="submit"
            >
              {saveBtnLabel}
            </LinkButton>
          }
        </Slot>

        <Slot name="body">
          <LoadingScreen/>
          {renderContent(this.props)}
        </Slot>
      </DialogView>
    );
  },
});

let view = function(props) {
  return (
    <PopupForm {...props}>
      <Body {...props}/>
    </PopupForm>
  );
};

view = createComponent({ name, view, update });
export default view;
export { init, view };

