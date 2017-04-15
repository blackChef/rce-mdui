import React from 'react';
import { getSlotWithName } from '../slot/';
import createComponent from 'rce-pattern/createComponent';
import checkProps from '../utils/checkProps';


let name = 'Collapse';

let init = function() {
  return false; // is open
};

let update = function({ type, payload, model, dispatch }) {
  model.set( !model.val() );
};

let view = React.createClass({
  componentWillReceiveProps(nextProps) {
    let { container, content } = this.refs;
    let checkOpen = checkProps('model.val', this.props, nextProps);
    let willOpen = checkOpen(false, true);
    let willClose = checkOpen(true, false);

    if (willOpen) {
      container.classList.add('is_active');
      setTimeout(function() {
        content.classList.add('is_active');
      }, 20);

    } else if (willClose) {
      content.classList.remove('is_active');
      let removeContainerClass = function() {
        container.classList.remove('is_active');
        content.removeEventListener('transitionend', removeContainerClass);
      };
      content.addEventListener('transitionend', removeContainerClass, false);
    }
  },

  componentDidMount() {
    let isOpen = this.props.model.val();
    let { container, content } = this.refs;

    if (isOpen) {
      container.classList.add('is_active');
      content.classList.add('is_active');
    }
  },

  render() {
    let { model, dispatch, dispatcher, children, className = '' } = this.props;
    let getSlot = getSlotWithName(children, true);
    let header = getSlot('header');
    let body = getSlot('body');

    return (
      <div className={`collapse ${className} ${model.val() ? 'is_active' : ''}`}>
        <div className="collapse_header" onClick={dispatcher('toggle')}>
          {header}
        </div>

        <div className="collapse_body" ref="container">
          <div className="collapse_body_inner" ref="content">
            {body}
          </div>
        </div>
      </div>
    );
  },
});

view = createComponent({ name, view, update });
export { init, view };

