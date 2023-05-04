import { RouteObject, Outlet } from 'react-router-dom';
import { HomePage } from './pages/home/home-page';
import { Layout } from './components/layout';
import { GraphiQlPage } from './pages/graphiql/graphiql-page';
import AuthRoute from './firebase/AuthRoute';
import { initializeApp } from 'firebase/app';
import { config } from './firebase/firebase-config';
import { RegisterPage } from './pages/authentication/register-page';
import { LoginPage } from './pages/authentication/login-page';
import { InitPage } from './pages/authentication/init-page';
initializeApp(config.firebaseConfig);

export const routesMap = {
  home: {
    path: '/',
    title: 'Home',
  },
  graphiql: {
    path: '/graphiql',
    title: 'GraphiQL',
  },
  login: {
    path: '/login',
    title: 'login',
  },
  register: {
    path: '/register',
    title: 'register',
  },
  init: {
    path: '/init',
    title: 'init',
  },
} as const;

export const routes: RouteObject[] = [
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Outlet />,
        children: [
          {
            path: routesMap.home.path,
            element: (
              <AuthRoute>
                <HomePage />
              </AuthRoute>
            ),
          },

          {
            path: routesMap.graphiql.path,
            element: <GraphiQlPage />,
          },
        ],
      },
    ],
  },
  {
    path: routesMap.register.path,
    element: <RegisterPage />,
  },
  {
    path: routesMap.login.path,
    element: <LoginPage />,
  },
  {
    path: routesMap.init.path,
    element: <InitPage />,
  },
];
