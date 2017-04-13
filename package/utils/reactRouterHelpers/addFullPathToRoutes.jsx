// https://github.com/kuflash/react-router-sitemap/blob/master/lib/routes-parser/index.js
// add full path to router

import { resolve } from 'path';

let buildPath = (basePath = '', routePath = '') => {

  return resolve(basePath, routePath);
};

let parseRoutes = (routes = [], basePath = '') => {

  let isArrayOfRoutes = Array.isArray(routes);

  if (!isArrayOfRoutes) {
    let fullPath = buildPath(basePath, routes.path);
    routes.fullPath = fullPath;

    let childRoutes = routes.childRoutes;
    if (childRoutes && childRoutes.length) parseRoutes(childRoutes, fullPath);

  } else {

    routes.forEach(function(route) {
      let fullPath = buildPath(basePath, routes.path);
      route.fullPath = fullPath;
      parseRoutes(route, fullPath);
    });

  }
};


export default function(routes) {
  let copy = Object.assign({}, routes);
  parseRoutes(copy);
  return copy;
};