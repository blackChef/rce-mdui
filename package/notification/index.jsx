import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { default as setClassNames } from 'classnames';
import { view as IconButton } from '../buttons/iconButton';
import { getSlotWithName } from '../slot/';



let name = 'notification';

let init = function() {
  return false;
};

let update = function({ type, payload, model, dispatch }) {
  if (type == 'hide') {
    model.set(false);
  }
};

let view = React.createClass({
  componentDidMount() {
    document.body.appendChild(this.refs.main);
  },

  componentWillUnmount() {
    this.refs.main.remove();
  },

  close() {
    let { onClose = () => {}, dispatch } = this.props;

    dispatch('hide');
    onClose();
  },

  render() {
    let {
      model,
      children,
      className = '',
    } = this.props;

    let getSlot = getSlotWithName(children);

    let icon = getSlot(true, 'icon');
    let title = getSlot(false, 'title')[0].props.content;
    let meta = getSlot(false, 'meta')[0].props.content;
    let content = getSlot(true, 'content');
    let actions = getSlot(true, 'actions').map(function(item, index) {
      return <div key={index} className="notification_actions_item">{item}</div>;
    });

    let classNames = setClassNames(`notification ${className}`, {
      'is_active': model.val()
    });


    return (
      <div className="notification_placeholder" style={{ display: 'none' }}>
        <div className={classNames} ref="main">
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
                icon="close"
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
export { init, view };