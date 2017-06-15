import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import { getSlotContent } from '../slot/';
import { matchValues } from '../utils/checkProps';


let name = 'Collapse';

let init = function() {
  return false; // is open
};

let update = function({ type, payload, model, dispatch }) {
  model.set( !model.val() );
};

let view = createClass({
  componentWillReceiveProps(nextProps) {
    let { container, content } = this.refs;
    let checkOpen = matchValues('model.val', this.props, nextProps);
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
    let getContent = getSlotContent(children);
    let header = getContent('header');
    let body = getContent('body');

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

