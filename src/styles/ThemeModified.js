import { createMuiTheme } from "@material-ui/core";
import IBMPlexMono from '../assets/fonts/ibm-plex-mono-v6-latin-regular.ttf';

const ibmPlexMono = {
    fontFamily: 'IBM Plex Mono',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
      local('IBMPlexMono'),
      url(${IBMPlexMono}) format('ttf')
    `,
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const theme = createMuiTheme({
		palette: {
			primary: {
			light: '#757ce8',
			main: '#3f50b5',
			dark: '#002884',
			contrastText: '#fff',
			},
			secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#000',
			},
		},
		typography: {
			fontFamily: ['"Poppins"', 'sans-serif', '"Open Sans"', 'IBM Plex Mono', 'Roboto'].join(','),
		  	fontSize: 20,
		},
		overrides: {
			MuiCssBaseline: {
			  '@global': {
				'@font-face': [ibmPlexMono],
			  },
		}
	}
});

export default theme;