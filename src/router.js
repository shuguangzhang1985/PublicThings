import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import TagManager from './routes/TagManager';
import SearchPlace from './routes/SearchPlace'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/tag" exact component={TagManager} />
        <Route path="/search" exact component={SearchPlace} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
