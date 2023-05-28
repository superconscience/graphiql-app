import { FC } from 'react';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import { store } from './store/store';
import { Provider } from 'react-redux';

const router = createBrowserRouter(routes);

const App: FC = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
export default App;
