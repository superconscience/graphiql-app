import { RouteObject, Outlet } from 'react-router-dom';
import { HomePage } from './pages/home/home-page';
import { Layout } from './components/layout';
import { GraphiQlPage } from './pages/graphiql/graphiql-page';

export const routesMap = {
  home: {
    path: '/',
    title: 'Home',
  },
  graphiql: {
    path: '/graphiql',
    title: 'GraphiQL',
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
            element: <HomePage />,
          },
          {
            path: routesMap.graphiql.path,
            element: <GraphiQlPage />,
          },
        ],
      },
    ],
  },
];
