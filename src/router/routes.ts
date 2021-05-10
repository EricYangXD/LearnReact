import { lazy } from 'react';

const User = lazy(() => import('pages/user'));
const Sell = lazy(() => import('pages/sell'));
const Home = lazy(() => import('pages/home'));
const MockLogin = lazy(() => import('pages/login/MockLogin'));

export const BasePath = '';

export const getPath = (p) => `${BasePath}${p}`;

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
