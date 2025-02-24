import React from 'react';
import { ChakraProvider, ThemeConfig } from '@chakra-ui/react';
import { HashRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import theme from './theme';

// Pages
import Home from './pages/Home';
import Builder from './pages/Builder';
import Templates from './pages/Templates';

// Components
import Header from './components/layout/Header';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';

const ClerkWithRoutes = () => {
  const navigate = useNavigate();

  if (!publishableKey) {
    console.warn('Clerk publishable key is missing. Authentication features will be disabled.');
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      appearance={{
        baseTheme: undefined
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ClerkProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme as ThemeConfig}>
        <Router>
          <ClerkWithRoutes />
        </Router>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
