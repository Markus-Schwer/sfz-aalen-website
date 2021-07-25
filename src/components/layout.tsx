import React, { FunctionComponent } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image"
import { WindowLocation } from "@reach/router";

import Header from "./header";
import Footer from "./footer";

import "./layout.scss";

type LayoutProps = {
  location: WindowLocation<WindowLocation["state"]>;
  image: ImageDataLike;
  imageAlt: string;
};

const Layout: FunctionComponent<LayoutProps> = ({
  location,
  image,
  imageAlt,
  children,
}) => {
  const imageData = getImage(image)!!;

  return (
    <div>
      <Header location={location} />
      <div className="main-image-container">
        <GatsbyImage image={imageData} alt={imageAlt} />
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
