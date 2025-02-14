import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import theme from './theme';

// Import pages (we'll create these next)
import Home from './pages/Home';
import Builder from './pages/Builder';
import Templates from './pages/Templates';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/templates" element={<Templates />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
