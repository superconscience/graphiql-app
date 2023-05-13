import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './18n';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
        <App />
    </Suspense>
  </React.StrictMode>
);
