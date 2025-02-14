import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      smoke: '#F7F4F3',
      wine: '#5B2333',
    },
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
        colorScheme: 'brand',
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