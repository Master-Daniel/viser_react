import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, persistor } from './lib/redux/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CacheProvider } from '@emotion/react';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

import createCache from '@emotion/cache';
import App from './App.jsx';

const queryClient = new QueryClient();
const createEmotionCache = () => createCache({ key: 'css' });
const clientSideEmotionCache = createEmotionCache();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CacheProvider value={clientSideEmotionCache}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </CacheProvider>
  </StrictMode>,
);
