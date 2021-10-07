import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import { ToastProvider } from 'react-toast-notifications';

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
      <App />
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
