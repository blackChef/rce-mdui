import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { view as Spinner } from '../progressIndicator/circular';
import { view as LinkButton } from '../buttons/linkButton';
import { view as Icon } from '../icon/';
import { view as Transition } from '../transition/enterLeave';
import MdError from 'react-icons/lib/md/error';
import MdCheckCircle from 'react-icons/lib/md/check-circle';



let name = 'Content';

let init = function() {};

let renderActions = function({ model, onRequestRetry, parentDispatch }) {
  if (model.val() === 'failed') {
    return (
      <div className="loadingScreen_actions">
        {
          typeof onRequestRetry === 'function' &&
          <LinkButton
            className="linkButton--accent linkButton--bounded"
            onClick={onRequestRetry}
          >
            重试
          </LinkButton>
        }
        <LinkButton
          className="linkButton--accent linkButton--bounded"
          onClick={() => parentDispatch('setStatus', 'hide')}
        >
          取消
        </LinkButton>
      </div>
    );
  }
};

let LoadingInfo = function({ msg = '请稍候' }) {
  return (
    <div className="loadingScreen_info">
      <div className="loadingScreen_indicator">
        <Spinner />
      </div>

      <div className="loadingScreen_msg">{msg}</div>
    </div>
  );
};

let FailedInfo = function({ msg = '出错了' }) {
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

let SuccessInfo = function({ msg = '加载成功' }) {
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

let renderInfo = function({ model, loadingMsg, failedMsg, successMsg }) {
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
  let { model, className = '' } = props;

  return (
    <Transition
      className={`loadingScreen ${className}`} data-status={model.val()}
      leaveTimeout={300} leaveName="fadeout"
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
export { init, view };