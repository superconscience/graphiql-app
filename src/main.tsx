import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './18n';
import { Loader } from './components/loader';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Suspense fallback={<Loader />}>
    <App />
  </Suspense>
);
