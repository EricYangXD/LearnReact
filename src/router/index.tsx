import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from 'components/loader';

const renderRoutes = (routes, extraProps = {}, switchProps = {}) =>
  routes ? (
    // 加载动画
    <Suspense fallback={<Loader />}>
      {/* 路由切换 */}
      <Switch {...switchProps}>
        {routes.map((route, i) => (
          <Route
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={(props) => <route.component {...props} {...extraProps} route={route} />}
          />
        ))}
      </Switch>
    </Suspense>
  ) : null;

export default renderRoutes;
