import { createBrowserRouter } from "react-router-dom"
import React from 'react';
import { Navigate } from "react-router-dom";
const Login = React.lazy(() => import('../pages/Login.jsx'))
const HomePage = React.lazy(() => import('../pages/homePage.jsx'))
const Blog = React.lazy(() => import('../pages/blog/index.jsx'))
const User = React.lazy(() => import('../pages/user/index.jsx'))
const Home = React.lazy(() => import('../pages/home/index.jsx'))
const Welcome = React.lazy(() => import('../pages/Welcome.jsx'))
const NotFound = React.lazy(() => import('../pages/NotFound.jsx'))
// 创建路由
const routes = createBrowserRouter([
  {
    path: '/HomePage',
    Component: HomePage
  },
  {
    path: '/login',
    Component: Login
  },
  {
    path: '/',
    element: <Navigate to="/HomePage" replace />
  },
  {
    path: '*',
    element: <Navigate to="/HomePage" replace />
  },
  {
    path: '/',
    Component: Home,
    children: [{
      index: true,
      Component: Welcome,
    }, {
      path: '/blog',
      Component: Blog,
    },
    {
      path: '/user',
      Component: User,
    },
    {
      path: '*',
      Component: NotFound,
    }]
  },
])
export default routes