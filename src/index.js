import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { DarkModeProvider } from './components/DarkModeContext';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeProvider>
    <App />
    </DarkModeProvider>
  </React.StrictMode>
);

reportWebVitals();
