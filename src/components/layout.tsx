import React, { FunctionComponent } from "react";
import Image from 'next/image';

import Header from "./header";
import Footer from "./footer";

import styles from "./layout.module.scss";

type LayoutProps = {
  image?: string;
  imageAlt: string;
  logoScrollEffect?: boolean;
};

const Layout: FunctionComponent<LayoutProps> = ({
                                                  image,
                                                  imageAlt,
                                                  children,
                                                  logoScrollEffect
                                                }) => {
  return (
    <div>
      <Header logoScrollEffect={logoScrollEffect}/>
      {image ? (
        <div className={styles.mainImageContainer}>
          <Image src={image} alt={imageAlt} layout="fill" objectFit="cover"/>
        </div>
      ) : null}
      {children}
      <Footer/>
    </div>
  );
};

export default Layout;
