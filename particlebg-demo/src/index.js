import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DemoApp from './DemoApp/DemoApp.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DemoApp />
  </React.StrictMode>
);
// Default index.js React file