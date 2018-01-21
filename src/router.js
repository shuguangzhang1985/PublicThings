import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import TagManager from './routes/TagManager';
import SearchPlace from './routes/SearchPlace'
import Account from './routes/Account'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/tag" exact component={TagManager} />
        <Route path="/search" exact component={SearchPlace} />
        <Route path="/account" exact component={Account} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
