import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

const renderApp = (publishableKey: string) => {
  root.render(
    <React.StrictMode>
      <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    </React.StrictMode>
  );
};

const fetchKeyAndRender = async () => {
  try {
    const response = await fetch('/api/get-clerk-key');
    if (!response.ok) {
      throw new Error(`Failed to fetch key: ${response.statusText}`);
    }
    const data = await response.json();
    const key = data.key;

    if (!key) {
      throw new Error("Missing Clerk Publishable Key");
    }
    renderApp(key);
  } catch (error) {
    console.error(error);
    root.render(<div>Something went wrong fetching the key.</div>);
  }
};

fetchKeyAndRender();