import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  primary: {
    50: '#E6F6FF',
    100: '#BAE3FF',
    200: '#7CC4FA',
    300: '#47A3F3',
    400: '#2186EB',
    500: '#0967D2',
    600: '#0552B5',
    700: '#03449E',
    800: '#01337D',
    900: '#002159',
  },
  accent: {
    50: '#E3F8FF',
    100: '#B3ECFF',
    200: '#81DEFD',
    300: '#5ED0FA',
    400: '#40C3F7',
    500: '#2BB0ED',
    600: '#1992D4',
    700: '#127FBF',
    800: '#0B69A3',
    900: '#035388',
  },
  gray: {
    50: '#F5F7FA',
    100: '#E4E7EB',
    200: '#CBD2D9',
    300: '#9AA5B1',
    400: '#7B8794',
    500: '#616E7C',
    600: '#52606D',
    700: '#3E4C59',
    800: '#323F4B',
    900: '#1F2933',
  },
};

const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'primary',
      },
      variants: {
        solid: (props: { colorScheme: string }) => ({
          bg: `${props.colorScheme}.500`,
          color: 'white',
          _hover: {
            bg: `${props.colorScheme}.600`,
          },
          _active: {
            bg: `${props.colorScheme}.700`,
          },
        }),
        outline: (props: { colorScheme: string }) => ({
          borderColor: `${props.colorScheme}.500`,
          color: `${props.colorScheme}.500`,
          _hover: {
            bg: `${props.colorScheme}.50`,
          },
          _active: {
            bg: `${props.colorScheme}.100`,
          },
        }),
        ghost: (props: { colorScheme: string }) => ({
          color: `${props.colorScheme}.500`,
          _hover: {
            bg: `${props.colorScheme}.50`,
          },
          _active: {
            bg: `${props.colorScheme}.100`,
          },
        }),
      },
    },
    Heading: {
      baseStyle: {
        color: 'gray.900',
        _dark: {
          color: 'gray.50',
        },
      },
    },
    Text: {
      baseStyle: {
        color: 'gray.800',
        _dark: {
          color: 'gray.100',
        },
      },
    },
    Link: {
      baseStyle: {
        color: 'primary.500',
        _hover: {
          textDecoration: 'none',
          color: 'primary.600',
        },
      },
    },
    Tag: {
      defaultProps: {
        colorScheme: 'primary',
      },
    },
  },
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
      },
    }),
  },
});

export default theme; 