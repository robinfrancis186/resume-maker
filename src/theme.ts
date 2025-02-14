import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#f7fafc',
      100: '#edf2f7',
      200: '#e2e8f0',
      300: '#cbd5e0',
      400: '#a0aec0',
      500: '#718096',
      600: '#4a5568',
      700: '#2d3748',
      800: '#1a202c',
      900: '#171923',
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'brand.smoke',
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'blue',
      },
      variants: {
        solid: {
          bg: 'brand.wine',
          color: 'white',
          _hover: {
            bg: 'brand.wine',
            opacity: 0.9,
          },
        },
        outline: {
          borderColor: 'brand.wine',
          color: 'brand.wine',
          _hover: {
            bg: 'brand.wine',
            color: 'white',
          },
        },
      },
    },
    Tag: {
      defaultProps: {
        colorScheme: 'brand',
      },
      variants: {
        solid: {
          bg: 'brand.wine',
          color: 'white',
        },
        outline: {
          borderColor: 'brand.wine',
          color: 'brand.wine',
        },
      },
    },
  },
});

export default theme; 