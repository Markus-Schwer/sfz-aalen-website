import React, { FunctionComponent } from "react";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image"
import { WindowLocation } from "@reach/router";

import Header from "./header";
import Footer from "./footer";

import "./layout.scss";

type LayoutProps = {
  image: ImageDataLike;
  imageAlt: string;
  logoScrollEffect?: boolean;
};

const Layout: FunctionComponent<LayoutProps> = ({
  image,
  imageAlt,
  children,
  logoScrollEffect,
}) => {
  const imageData = getImage(image)!!;

  return (
    <div>
      <Header logoScrollEffect={logoScrollEffect} />
      <div className="main-image-container">
        <GatsbyImage image={imageData} alt={imageAlt} />
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
