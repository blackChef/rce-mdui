import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import setClassNames from 'classnames';
import { view as IconButton } from '../buttons/iconButton';
import { getSlot, getSlotContent } from '../slot/';
import MdClose from 'react-icons/lib/md/close';
import './index.scss';



const name = 'notification';

const init = function() {
  return false;
};

const update = function({ model }) {
  model.set(false);
};

let view = createClass({
  componentDidMount() {
    document.body.appendChild(this.mainRef);
  },

  componentWillUnmount() {
    this.mainRef.remove();
  },

  close() {
    const { onClose = () => {}, dispatch } = this.props;
    dispatch('hide');
    onClose();
  },

  render() {
    const {
      model,
      children,
      className = '',
    } = this.props;

    const getRawSlot = getSlot(children);
    const title = getRawSlot('title').props.content;
    const meta = getRawSlot('meta').props.content;

    const getContent = getSlotContent(children);
    const icon = getContent('icon');
    const content = getContent('content');
    const actions = getContent('actions').map(function(item, index) {
      return <div key={index} className="notification_actions_item">{item}</div>;
    });

    const classNames = setClassNames(`notification ${className}`, {
      'is_active': model.val()
    });

    return (
      <div className="notification_placeholder" style={{ display: 'none' }}>
        <div className={classNames} ref={e => this.mainRef = e}>
          <div className="notification_card">
            <div className="notification_header">
              <div className="notification_header_left">
                <div className="notification_icon">
                  {icon}
                </div>

                <div className="notification_title">
                  {title}
                </div>
                <div className="notification_meta">{meta}</div>
              </div>

              <IconButton
                icon={MdClose}
                className="notification_closeBtn notification_header_right"
                onClick={this.close}
              />
            </div>

            <div className="notification_body">
              {content}
            </div>

            <div className="notification_actions">{actions}</div>
          </div>
        </div>
      </div>
    );
  },
});



view = createComponent({ name, view, update });
export default view;
export { init, view };
