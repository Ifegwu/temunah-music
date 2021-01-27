import { createGlobalStyle } from 'styled-components';
import bg from '../assets/images/bg.svg';
import stripes from '../assets/images/stripes.svg';

const GlobalStyles = createGlobalStyle`
  :root {
    --pink: #B52FF8;
    --black: #2E2E2E;
    --yellow: #ffc600;
    --white: #fff;
    /* --grey: #efefef; */
    --lightGrey: #f2f4f6;
    --text: green;
    --headerStyle: rgba(0, 0, 0, 0)
    --headerBackground: var(--darkBlue);

    --green: rgba(141, 211, 217, 0.8);
    --softRed: #ff585d;
    --darkBlue: #022640;
    --grey: #f0f0f3;
    --darkGrey: #555;
    --text: rgb(0, 0, 0);
    --greyPalette: #A0AEC0;
    --grayPro: #E3E8FF;
    --primary: #8352FD;
    --primary2: #3913B8;
    --secondary: #00CFFD;
    --secondary2: #2FB5FC;
    --naturalDark: #1A2151;
    --naturalLight: #E3E8FF;


    --blueOverlay: rgba(2, 38, 64, 0.8);
    --redOverlay: rgba(255, 204, 204, 0.8);
    --greenOverlay: rgba(141, 211, 217, 0.8);

    --success: #bedcaa;
    --warning: #ffe890;
    --danger: #ffaead;

    // Text shadows (neumorphic)
    --shadowColor: #c0c0c0;
    --brShadow: -6px 6px 15px rgba(0, 0, 0, 0.5);
    --tlShadow: 6px -6px 15px rgba(255, 255, 255, 0.8);

    // Shadows
    --lightShadow: 0px 5px 15px rgba(2, 38, 64, 0.1);
    --darkShadow: 0px 5px 15px rgba(2, 38, 64, 0.25);
    --shadowBorder: 0.5px solid var(--lightShadow);

    --boxShadow: var(--lightShadow);
    --boxShadowHover: var(--darkShadow);
    --transform: scale(1.01);

    --shadow: 9px 9px 22px -2px var(--darkShadow),
      -9px -9px 18px var(--lightShadow);

    --shadowFull: 0px 1px 5px 5px rgb(163, 177, 198, 0.25);
    
    /* Elevation */
    --level-1: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --level-2: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --level-3: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --level-4: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  }

  html {
    background-image: url(${bg});
    background-size: 450px;
    background-attachment: fixed;
    font-size: 12px;
  }

  body {
    font-size: 20px;
    webkit-font-smoothing: antialiased;
    line-hight: 1.3;
  }

  fieldset {
    border-color: rgba(0,0,0,0.1);
    border-width: 1px;
  }

  button {
    background: var(--pink);
    color: white;
    border: 0;
    padding: 0.6rem 1rem;
    border-radius: 2px;
    cursor: pointer;
    --cast: 2px;
    box-shadow: var(--cast) var(--cast) 0 var(--grey);
    text-shadow: 0.5px 0.5px 0 rgba(0,0,0,0.2);
    transition: all 0.2s;
    &:hover {
      --cast: 4px;
    }
  }

  .gatsby-image-wrapper img[src*=base64\\,] {
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
  }

  /* Scrollbar Styles */
  body::-webkit-scrollbar {
    width: 12px;
  }
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--pink) var(--white);
  }
  body::-webkit-scrollbar-track {
    background: var(--white);
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--pink) ;
    border-radius: 6px;
    border: 3px solid var(--white);
  }

  hr {
    border: 0;
    height: 8px;
    background-image: url(${stripes});
    background-size: 1500px;
  }

  img {
    max-width: 100%;
  }

  .tilt {
    transform: rotate(-2deg);
    position: relative;
    display: inline-block;
  }

  .modal {
    position: fixed;
    width: 100%;
    height: calc(100% - 2rem);
    bottom: 0;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    flex-grow: 1;
    pointer-events: none;
  }

  .overlay {
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
  
  .card {
    padding: 1em;
    background: white;
    box-shadow: var(--level-3);
    margin-bottom: 1rem;
    border-radius: 5px;
    padding-top: 20px;
    pointer-events: all;
    flex: 1;
    max-width: 400px;
    align-self: flex-start;
  }
  // .modal .card {
  //   padding-top: 60px;
  //   pointer-events: all;
  //   flex: 1;
  //   max-width: 500px;
  //   align-self: flex-start;
  // }
`;

export default GlobalStyles;