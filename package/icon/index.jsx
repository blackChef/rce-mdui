import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import * as mdIcon from 'react-icons/lib/md';
import camelCase from 'lodash/camelCase';


let name = 'icon';

let init = function() {};

let update = function({ type, payload, model, dispatch }) {};

let parseIconName = function(name) {
  let a = camelCase(name);
  let b = `${a[0].toUpperCase()}${a.slice(1)}`;
  return 'Md' + b;
};

let view = function(props) {
  let {
    model,
    dispatch,
    dispatcher,
    type,
    icon = type,
    className = '',
    size = 24,
    ...otherProps
  } = props;

  let iconName = parseIconName(icon);
  let Icon = mdIcon[iconName];

  if (!Icon) {
    console.error('rce-mdui/icon:', `can't fint icon file for ${icon}`);
    return null;
  }

  return (
    <div className={`mdIcon ${className}`} style={{ width: size }}>
      <Icon {...otherProps}/>
    </div>
  );
};

view = createComponent({ name, view, update });
export { init, view };