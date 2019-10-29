import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { view as Icon } from '../icon/';
import { view as Button } from './Button';


let name = 'iconButton';

let init = function() {};

let view = function(props) {
  let {
    children,
    icon,
    className,
    ...otherProps
  } = props;

  return (
    <Button
      {...otherProps}
      className={`rwdFlatButton ${className}`}
    >
      <Icon className="rwdFlatButton_icon" icon={icon} />
      <span className="rwdFlatButton_label">{children}</span>
    </Button>
  );
};


view = createComponent({ name, view });
export default view;
export { init, view };
