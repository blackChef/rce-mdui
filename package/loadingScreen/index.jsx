import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import { view as Content } from './content';

let name = 'loadingScreen';

let init = function() {
  return 'hide'; // status: hide, loading, success, failed
};

let update = function({ payload, model }) {
  model.set(payload);
};

let view = createClass({
  getInitialState() {
    return {
      showContent: this.props.model.val() === 'loading',
      startTime: -1,
    };
  },

  componentDidMount() {
    this.isMounted = true;
  },

  componentWillUnmount() {
    this.isMounted = false;
  },
  componentDidUpdate(prevProps) {
    let prevStatus = prevProps.model.val();
    let curStatus = this.props.model.val();
    let isStatusBecame = targetStatus => prevStatus !== targetStatus && curStatus === targetStatus;
    let {
      dispatch,
      delay = 300,
      showSuccessMsg = false,
      successMsgDuration = 800,
    } = this.props;

    if (isStatusBecame('loading')) {
      this.setState({ startTime: Date.now() });
      setTimeout(() => {
        let afterDelayStatus = this.props.model.val();
        if (afterDelayStatus === 'loading' && this.isMounted) {
          this.setState({ showContent: true });
        }
      }, delay);
      return;
    }

    if (isStatusBecame('success')) {
      if (showSuccessMsg) {
        let endTime = Date.now();
        if (endTime - this.state.startTime > delay) {
          this.setState({ showContent: true });
          setTimeout(() => {
            dispatch('setStatus', 'hide');
          }, successMsgDuration);
        }
      } else {
        this.setState({ showContent: false });
        dispatch('setStatus', 'hide');
      }
      return;
    }

    if (isStatusBecame('failed')) {
      this.setState({ showContent: true });
      return;
    }

    if (isStatusBecame('hide')) {
      this.setState({ showContent: false });
      return;
    }
  },

  render() {
    if (!this.state.showContent) return null;
    return (
      <Content {...this.props}
        parentDispatch={this.props.dispatch}
      />
    );
  },
});

view = createComponent({ name, view, update });
export { init, view };