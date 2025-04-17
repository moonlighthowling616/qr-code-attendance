import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import './main.css';
import ScannerProvider from './services/ScannerContext.jsx'

// Call the element loader before the render call
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ScannerProvider>
      <App />
    </ScannerProvider>
  </React.StrictMode>
);
defineCustomElements(window);