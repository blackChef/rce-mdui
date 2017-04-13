import { cloneElement } from 'react';

let createMap = function(model, navDrawerToggle, prefix = 'page_') {
  let ret = [];

  model.forEach(function(subModelName, subModel) {
    ret.push([
      `${prefix}${subModelName.replace('Model', '')}`, {
        navDrawerToggle,
        model: subModel,
      }
    ]);
  });

  return new Map(ret);
};

let render = function(children, map) {
  if (!children) return;
  let name = children.type.displayName.replace(/^wrapper_/, '');
  let props = map.get(name);
  return cloneElement(children, props);
};

export default function(children, model, navDrawerToggle, prefix = 'page_') {
  let map = createMap(model, navDrawerToggle, prefix = 'page_');
  return render( children, map);
};


