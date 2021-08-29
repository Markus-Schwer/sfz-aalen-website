import React, { FunctionComponent } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { WindowLocation } from "@reach/router";

import { PageData } from "../../gatsby-node";
import Header from "./header";
import Footer from "./footer";

import * as styles from "./layout.module.scss";
import BubbleHeaderBackground from "../images/bubble-header-background.svg";

const mainTitleColorMap: any = {
  primary: styles.mainTitlePrimary,
  secondary: styles.mainTitleSecondary,
  tertiary: styles.mainTitleTertiary,
};

const mainTitleSizeMap: any = {
  small: styles.mainTitleSmall,
  medium: styles.mainTitleMedium,
  big: styles.mainTitleBig,
};

type LayoutProps = {
  pageData: PageData;
  location: WindowLocation<WindowLocation["state"]>;
};

const Layout: FunctionComponent<LayoutProps> = ({
  pageData,
  location,
  children,
}) => {
  return (
    <div>
      <Header logoScrollEffect={location.href === "/home"} />
      {pageData.thumbnails ? (
        <div className={styles.mainImageContainer}>
          <GatsbyImage image={getImage(pageData.thumbnails[0])!!} alt="" />
        </div>
      ) : pageData.previewThumbnails && (
        <div className={styles.mainImageContainer}>
          <img className={styles.previewImage} src={pageData.previewThumbnails[0]} />
        </div>
      )}
      <div className={styles.mainContainer}>
        <span className={styles.currentPageName}>
          {pageData.breadcrumbs?.map((breadcrumb, index) => (
            <span key={index}>{breadcrumb}</span>
          ))}
        </span>
        {pageData.motto?.length === 3 ? (
          <div className={styles.mainTitle}>
            <BubbleHeaderBackground
              className={styles.mainTitleBackground}
              height={230}
            />
            <div className={styles.mainTitleText}>
              {pageData.motto.map(
                (
                  motto: { text: string; size: string; color: string },
                  index: number
                ) => (
                  <span
                    className={[
                      mainTitleColorMap[motto.color],
                      mainTitleSizeMap[motto.size],
                    ].join(" ")}
                    key={index}
                  >
                    {motto.text}
                  </span>
                )
              )}
            </div>
          </div>
        ) : null}
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
