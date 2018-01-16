import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import TagManager from './routes/TagManager'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/tag" exact component={TagManager} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
