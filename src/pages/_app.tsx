import { FunctionComponent } from "react";
import type { AppProps } from 'next/app';

import "normalize.css";
import "@fontsource/open-sans";
import "@fontsource/open-sans/700.css";
import "../styles/typography.scss"
import "../styles/global.scss";

const App: FunctionComponent<AppProps> = ({Component, pageProps}) => {
  return <Component {...pageProps} />
}

export default App;
