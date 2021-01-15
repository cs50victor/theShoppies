import { GlobalStyles } from "twin.macro";
import BaseStyle from "./../baseStyle";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <BaseStyle whiteColor />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
