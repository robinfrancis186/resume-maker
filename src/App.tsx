import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import theme from './theme';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  useAuth,
} from '@clerk/clerk-react';

// Import pages
import Home from './pages/Home';
import Builder from './pages/Builder';
import Templates from './pages/Templates';
import Header from './components/layout/Header';
import LoadingState from './components/common/LoadingState';

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <LoadingState />;
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => {
        const newPath = to.startsWith('/') ? to.slice(1) : to;
        window.location.hash = newPath;
      }}
    >
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/builder"
                element={
                  <ProtectedRoute>
                    <Builder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/templates"
                element={
                  <ProtectedRoute>
                    <Templates />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ChakraProvider>
      </Provider>
    </ClerkProvider>
  );
}

export default App;
