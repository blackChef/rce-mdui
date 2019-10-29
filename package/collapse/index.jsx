import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import { getSlotContent } from '../slot/';
import { matchValues } from '../utils/checkProps';
import { view as Icon }  from '../icon';
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import './index.scss';


const name = 'Collapse';

const init = function() {
  return false; // is open
};

const update = function({ model }) {
  model.set( !model.val() );
};

let view = createClass({
  componentDidUpdate(prevProps) {
    const { container, content } = this;
    const checkOpen = matchValues('model.val', this.props, prevProps);
    const willOpen = checkOpen(true, false);
    const willClose = checkOpen(false, true);

    if (willOpen) {
      container.classList.add('is_active');
      setTimeout(function() {
        content.classList.add('is_active');
      }, 20);

    } else if (willClose) {
      content.classList.remove('is_active');
      const removeContainerClass = function() {
        container.classList.remove('is_active');
        content.removeEventListener('transitionend', removeContainerClass);
      };
      content.addEventListener('transitionend', removeContainerClass, false);
    }
  },

  componentDidMount() {
    const isOpen = this.props.model.val();
    const { container, content } = this;

    if (isOpen) {
      container.classList.add('is_active');
      content.classList.add('is_active');
    }
  },

  render() {
    const { model, dispatcher, children, className = '' } = this.props;
    const getContent = getSlotContent(children);
    const header = getContent('header');
    const body = getContent('body');

    return (
      <div className={`collapse ${className} ${model.val() ? 'is_active' : ''}`}>
        <div className="collapse_header" onClick={dispatcher('toggle')}>
          <Icon icon={MdKeyboardArrowDown}/>
          <div>{header}</div>
        </div>

        <div className="collapse_body" ref={e => this.container = e}>
          <div className="collapse_body_inner" ref={e => this.content = e}>
            {body}
          </div>
        </div>
      </div>
    );
  },
});

view = createComponent({ name, view, update });
export default view;
export { init, view };


