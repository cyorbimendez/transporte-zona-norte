import { createTheme } from '@mui/material/styles';

/* Paleta: verde de rótulo de ruta CR + amarillo reflectivo + concreto.
   Verde WhatsApp reservado para botones que abren WhatsApp, para que el
   color signifique una cosa y nada más. Texto oscuro sobre ese verde:
   el blanco no pasa contraste (2:1). */
const display = '"Archivo", system-ui, sans-serif';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#10462f',
      light: '#1b6b48',
      dark: '#0a2e1f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f2b10c',
      dark: '#e0a300',
      contrastText: '#0a2e1f',
    },
    success: {
      main: '#25d366',
      dark: '#1fb857',
      contrastText: '#06301a',
    },
    error: {
      main: '#a33a1f',
    },
    background: {
      default: '#f4f2ee',
      paper: '#ffffff',
    },
    concreto: {
      main: '#e9e7e1',
    },
    text: {
      primary: '#1a1d1a',
      secondary: '#6b6f69',
    },
    divider: '#cbc8bf',
  },
  typography: {
    fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
    h1: {
      fontFamily: display,
      fontWeight: 800,
      letterSpacing: '-0.025em',
      lineHeight: 1.02,
    },
    h2: {
      fontFamily: display,
      fontWeight: 800,
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
    },
    h3: {
      fontFamily: display,
      fontWeight: 800,
      letterSpacing: '-0.015em',
      lineHeight: 1.2,
    },
    h4: {
      fontFamily: display,
      fontWeight: 800,
    },
    h5: {
      fontFamily: display,
      fontWeight: 800,
    },
    h6: {
      fontFamily: display,
      fontWeight: 700,
    },
    overline: {
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: '0.1em',
      lineHeight: 1.4,
    },
    button: {
      fontFamily: display,
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': {
            outline: '3px solid #f2b10c',
            outlineOffset: 3,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 18,
          minHeight: 44,
          transition: 'transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease',
          '@media (hover: hover) and (pointer: fine)': {
            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 6px 16px rgba(10,46,31,.12)' },
          },
          '&:active': { transform: 'scale(.98)' },
        },
        sizeLarge: {
          minHeight: 52,
          fontSize: 16,
        },
        outlined: {
          borderWidth: 1.5,
          '&:hover': { borderWidth: 1.5 },
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid #ddd8cf',
          boxShadow: '0 4px 16px rgba(10,46,31,.035)',
          transition: 'box-shadow 220ms ease, border-color 220ms ease, transform 220ms ease',
          '@media (hover: hover) and (pointer: fine)': {
            '&:where(a):hover': { transform: 'translateY(-4px)', borderColor: '#1b6b48', boxShadow: '0 14px 32px rgba(10,46,31,.12)' },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#cbc8bf',
            borderWidth: 1.5,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1b6b48',
          },
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          minWidth: 0,
          paddingInline: 0,
          color: '#6b6f69',
          '&.Mui-selected': { color: '#10462f' },
        },
        label: {
          fontSize: 11,
          fontWeight: 500,
          marginTop: 3,
          '&.Mui-selected': { fontSize: 11, fontWeight: 700 },
        },
      },
    },
  },
});

export default theme;
