import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AppContextProvider } from './context.tsx';
import './scss/main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>
);
