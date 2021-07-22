import React, { FunctionComponent } from "react";
import { WindowLocation } from "@reach/router";
import Header from "./header";
import Footer from "./footer";

import "./layout.scss";

type LayoutProps = {
  location: WindowLocation<WindowLocation["state"]>;
};

const Layout: FunctionComponent<LayoutProps> = ({ location, children }) => (
  <div>
    <Header location={location} />
    {children}
    <Footer />
  </div>
);

export default Layout;
