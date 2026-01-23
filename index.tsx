
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);

// Register Service Worker for PWA with automatic updates
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Use a relative path for the service worker to avoid origin mismatch in sandboxed environments
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => {
        console.log('SW registered with scope:', registration.scope);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, but the user needs to reload.
                console.log('New content available, please refresh.');
              }
            });
          }
        });
      })
      .catch(error => {
        // Log error but don't break the app functionality
        console.warn('Service Worker registration failed:', error);
      });
  });

  // Handle redundant workers
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });
}
