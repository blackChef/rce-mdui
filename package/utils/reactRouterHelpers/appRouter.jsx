import React from 'react';
import { Router, useRouterHistory  } from 'react-router';
import { createHashHistory } from 'history';
import addFullPathToRoutes from './addFullPathToRoutes';

let rawHistory = createHashHistory();

let history = useRouterHistory(createHashHistory)();

let view = function({ routes }) {
  return (
    <Router history={history} routes={ addFullPathToRoutes(routes) }/>
  );
};


export { view, history };