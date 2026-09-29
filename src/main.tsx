import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { LanguageProvider } from './lib/languageContext';
import { RudrashtakamMusic } from './components/audio/RudrashtakamMusic';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
      <RudrashtakamMusic />
    </LanguageProvider>
  </React.StrictMode>,
);
