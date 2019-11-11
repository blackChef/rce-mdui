import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import { view as FloatingLabel } from './floatingLabel';
import { view as NoFloatingLabel } from './noFloatingLabel';
import './index.scss';


const name = 'TextField';

const init = function() {
  return '';
};

let view = createClass({
  render() {
    const {
      floatingLabel = '',
      fixedFloatingLabel = false,
      hint = '',
      ...otherProps
    } = this.props;

    const Component = floatingLabel === '' ? NoFloatingLabel : FloatingLabel;
    const componentProps = floatingLabel === '' ?
      { hint } :
      { hint, floatingLabel, fixedFloatingLabel };

    return (
      <Component
        {...otherProps}
        {...componentProps}
      />
    );
  },
});


view = createComponent({ name, view });
export default view;
export { init, view };
