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

  componentWillReceiveProps(nextProps) {
    let nextStatus = nextProps.model.val();
    let {
      dispatch,
      delay = 500,
      showSuccessMsg = false,
      successMsgDuration = 800,
    } = this.props;

    // if loading-process is fast, we dont want to show anything at all
    if (nextStatus === 'loading') {
      this.setState({ startTime: Date.now() });

      setTimeout(() => {
        let isLoading = this.props.model.val() === 'loading';
        if (isLoading && this.isMounted) {
          this.setState({ showContent: true });
        }
      }, delay);
    }

    else if (nextStatus === 'success') {
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
    }

    else if(nextStatus === 'failed') {
      this.setState({ showContent: true });
    }

    else if (nextStatus === 'hide') {
      this.setState({ showContent: false });
    }
  },

  render() {
    let content = this.state.showContent ?
      (
        <Content {...this.props}
          parentDispatch={this.props.dispatch}
        />
      ) : null;

    return content;
  },
});

view = createComponent({ name, view, update });
export { init, view };