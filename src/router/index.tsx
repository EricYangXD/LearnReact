import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from 'components/loader';

const User = lazy(() => import('pages/user'));
const Sell = lazy(() => import('pages/sell'));
const Home = lazy(() => import('pages/home'));
const MockLogin = lazy(() => import('pages/login/MockLogin'));

export const BasePath = '/shopify';

const getPath = (p) => `${BasePath}${p}`;

// 路由
export const routes = [
  {
    path: getPath('/'),
    component: User,
    exact: true,
    name: 'root',
    hiddenInMenu: true,
  },
  {
    path: getPath('/user'),
    component: User,
    name: 'user',
  },
  {
    path: getPath('/home'),
    component: Home,
    name: 'home',
  },
  {
    path: getPath('/sell'),
    component: Sell,
    name: 'sell',
  },
  {
    path: getPath('/mockLogin'),
    component: MockLogin,
    name: 'login',
    hiddenInMenu: true,
  },
];

export default function AppRouter() {
  return (
    // 加载动画
    <Suspense fallback={<Loader />}>
      {/* 路由切换 */}
      <Switch>
        {routes.map(({ path: routePath, component, exact = false }) => (
          <Route key={routePath} path={routePath} component={component} exact={exact} />
        ))}
        {/* 默认 */}
        <Route component={Home} />
      </Switch>
    </Suspense>
  );
}
