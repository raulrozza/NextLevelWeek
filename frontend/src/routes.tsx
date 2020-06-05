import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Loading from './components/Loading';

const Home = lazy(() => import('./pages/Home'));
const CreatePoint = lazy(() => import('./pages/CreatePoint'));

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />} >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/create-point" component={CreatePoint} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Routes;
