import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import { view as SelectField } from './index';



let name = 'selectField--async';

let init = function() {
  return null;
};

let view = createClass({
  update(apiCall) {
    if (apiCall === null || apiCall === undefined) {
      return;
    }

    this.setState({ isLoading: true });

    apiCall().then(res => {
      let options;
      if (!res.data || !res.data.length) {
        options = [];
      } else {
        options = res.data.map(this.props.mapper);
      }

      this.setState({ options, isLoading: false });
    });
  },

  componentDidMount() {
    this.update(this.props.apiCall);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.uid !== this.props.uid) {
      this.update(nextProps.apiCall);
    }
  },

  getInitialState() {
    return { options: [], isLoading: false };
  },

  render() {
    let { model, floatingLabel } = this.props;
    let { options, isLoading } = this.state;

    if (!options.length) {
      return null;
    }

    let _floatingLabel, shouldDisable;

    if (isLoading) {
      _floatingLabel = `${floatingLabel} (正在加载数据...)`;
      shouldDisable = true;
    } else {
      _floatingLabel = floatingLabel;
      shouldDisable = false;
    }

    return (
      <SelectField
        disabled={shouldDisable}
        model={model}
        options={options}
        floatingLabel={_floatingLabel}
      />
    );
  }
});



view = createComponent({ name, view });
export { init, view };