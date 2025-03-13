import { createRoot } from 'react-dom/client'
import React from 'react';
import App from './App.tsx'
import './index.css'
import { initializeAppTweakWrappers } from './utils/appTweakWrapper';

// Initialize AppTweak MCP wrappers
initializeAppTweakWrappers();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
