import { createGlobalStyle } from 'styled-components';

// ibm-plex-mono-regular - latin 
import fontaot from '../assets/fonts/ibm-plex-mono-v6-latin-regular.eot';
import fontwoff from '../assets/fonts/ibm-plex-mono-v6-latin-regular.woff2';
import fontwoff2 from '../assets/fonts/ibm-plex-mono-v6-latin-regular.woff';
import fontttf from '../assets/fonts/ibm-plex-mono-v6-latin-regular.ttf';
import fontsvf from '../assets/fonts/ibm-plex-mono-v6-latin-regular.svg';

const Typo = createGlobalStyle`
  
  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    src: url(${fontaot}); /* IE9 Compat Modes */
    src: local(''),
        url(${fontaot}${'#iefix'}) format('embedded-opentype'), /* IE6-IE8 */
        url(${fontwoff2}) format('woff2'), /* Super Modern Browsers */
        url(${fontwoff}) format('woff'), /* Modern Browsers */
        url(${fontttf}) format('truetype'), /* Safari, Android, iOS */
        url(${fontsvf}${'#IBMPlexMono'}) format('svg'); /* Legacy iOS */
  }

  html {
    font-family: 'IBM Plex Mono', -apple-system, "Poppins", sans-serif, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue';
    color: var(--black);
  }

  p, li {
    letter-spacing: 0.5px;
  }
  h1,h2,h3,h4,h5,h6 {
    font-weight: normal;
    margin: 0;
  }
  a {
    color: var(--black);
    text-decoration-color: var(--red);
    /* Chrome renders this weird with this font, so we turn it off */
    text-decoration-skip-ink: none;
    font-weight: 600;
  }
  mark, .mark {
    background: var(--yellow);
    padding: 0 2px 2px 2px;
    margin: 0;
    display: inline;
    line-height: 1;
  }

  .center {
    text-align: center;
  }

  .tilt {
    transform: rotate(-2deg);
  }

  .header-scroll {
    background: rgba(0, 0, 0,0.8);
    padding: 15px 0;
  }
`;

export default Typo;