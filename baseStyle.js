import { createGlobalStyle } from "styled-components";

const BaseStyle = createGlobalStyle`
  @font-face {
        font-family: 'Inter';
        src: local("Inter"), url(/fonts/inter-var-latin.woff2) format('woff2'),
        font-weight: 100 900;
        font-style: normal;
        font-display:optional;
   }
  html { 
    font-family: "Inter var", system ui, ,sans-serif;
    scroll-behavior: smooth;
  }
  @supports (font-variation-settings: normal) {
      html { font-family: "Inter var", sans-serif; }
  }
  body {
    color: ${(props) => (props.whiteColor ? "white" : "black")};
    background : black;
    font-family: "Inter", system-ui, -apple-system, sans-serif;
  }
`;

export default BaseStyle;
