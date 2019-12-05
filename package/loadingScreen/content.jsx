import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { view as Spinner } from '../spinner/';
import { view as LinkButton } from '../buttons/linkButton';
import { view as Icon } from '../icon/';
import { view as Transition } from '../transition/leave';
import MdError from 'react-icons/lib/md/error';
import MdCheckCircle from 'react-icons/lib/md/check-circle';



const name = 'Content';

const init = function() {};

const renderActions = function(props) {
  const {
    model,
    parentDispatch,
    onRequestRetry,
    onRequestCancel = () => parentDispatch('setStatus', 'hide'),
    cancelBtnLabel = '取消',
    retryBtnLabel = '重试',
  } = props;
  if (model.val() === 'failed') {
    return (
      <div className="loadingScreen_actions">
        <LinkButton
          className="linkButton--bounded"
          onClick={onRequestCancel}
        >
          {cancelBtnLabel}
        </LinkButton>

        {
          typeof onRequestRetry === 'function' &&
          <LinkButton
            className="linkButton--accent linkButton--bounded leftGutter_margin_half"
            onClick={onRequestRetry}
          >
            {retryBtnLabel}
          </LinkButton>
        }
      </div>
    );
  }
};

const LoadingInfo = function({ msg = '请稍候' }) {
  return (
    <div className="loadingScreen_info">
      <div className="loadingScreen_indicator">
        <Spinner />
      </div>

      <div className="loadingScreen_msg">{msg}</div>
    </div>
  );
};

const FailedInfo = function({ msg = '出错了' }) {
  return (
    <div className="loadingScreen_info u_text_failed">
      <div className="loadingScreen_indicator">
        <Icon icon={MdError} className="mdIcon--inheritColor"
          size={40}
        />
      </div>

      <div className="loadingScreen_msg">{msg}</div>
    </div>
  );
};

const SuccessInfo = function({ msg = '加载成功' }) {
  return (
    <div className="loadingScreen_info u_text_success">
      <div className="loadingScreen_indicator">
        <Icon icon={MdCheckCircle} className="mdIcon--inheritColor"
          size={40}
        />
      </div>

      <div className="loadingScreen_msg">{msg}</div>
    </div>
  );
};

const renderInfo = function({ model, loadingMsg, failedMsg, successMsg }) {
  switch (model.val()) {
    case 'loading':
      return <LoadingInfo msg={loadingMsg} />;

    case 'success':
      return <SuccessInfo msg={successMsg} />;

    case 'failed':
      return <FailedInfo msg={failedMsg} />;
  }
};

let view = function(props) {
  const { model, className = '' } = props;

  return (
    <Transition
      className={`loadingScreen ${className}`}
      data-status={model.val()}
      duration={300} name="fadeout"
    >
       <div className="loadingScreen_front">
          {renderInfo(props)}
          {renderActions(props)}
       </div>

       <div className="loadingScreen_background" />
    </Transition>
  );
};



view = createComponent({ name, view });
export default view;
export { init, view };
