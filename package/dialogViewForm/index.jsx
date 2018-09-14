import React from 'react';
import createClass from 'create-react-class';
import noop from 'lodash/noop';
import createComponent from 'rce-pattern/createComponent';
import { view as Transition } from '../transition/appear';
import { view as DialogView } from '../dialogView/';
import { view as Slot } from '../slot/';
import { view as LinkButton } from '../buttons/linkButton';
import { view as PopupForm, init as popupFormInit } from '../popupForm/';

let name = 'DialogViewForm';
let init = popupFormInit;
let update = noop;

let renderMsg = function(model) {
  if (model.isInvalid.val()) {
    return (
      <aside className="infoBanner infoBanner--error">
        {model.invalidMsg.val()}
      </aside>
    );
  }
};

let renderContent = function(props) {
  let {
    model,
    content,
    getData,
    Form,
    transitionType = 'slideUp'
  } = props;

  let { isContentReady, isOpenAnimationEnd } = model.val();

  if (isContentReady && isOpenAnimationEnd) {
    let body = React.cloneElement(content, {
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

let Body = createClass({
  afterClose() {
    let {
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
    let {
      model, title, saveBtnProps = {},
      formId, onOpen, afterOpen, LoadingScreen,
      noSaveButton=false,
      // eslint-disable-next-line no-unused-vars
      resetModelAfterClose,
      ...otherProps
    } = this.props;

    let {
      isSaving,
      isContentReady,
    } = model.val();

    let {
      children: saveBtnContent = '保存',
      ...otherSaveBtnProps
    } = saveBtnProps;

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
              {...otherSaveBtnProps}
              disabled={!isContentReady || isSaving || otherSaveBtnProps.disabled}
              form={formId}
              type="submit"
            >
              {saveBtnContent}
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
export { init, view };
