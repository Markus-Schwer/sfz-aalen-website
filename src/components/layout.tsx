import React, { FunctionComponent } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import Slider from "react-slick";

import { PageData } from "../page-data";
import Header from "./header";
import Footer from "./footer";
import BubbleHeaderBackground from "../images/bubble-header-background.svg";

import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import * as styles from "./layout.module.scss";

import NavigationData from "../../content/navigation.json";

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
};

const Layout: FunctionComponent<LayoutProps> = ({ pageData, children }) => {
  const breakpoints = useBreakpoint();

  return (
    <div>
      <Header
        logoScrollEffect={pageData.path === "home"}
        navigationData={NavigationData}
      />
      <div
        className={[
          styles.mainImageContainer,
          pageData.path === "home" ? styles.home : undefined,
        ].join(" ")}
      >
        <Slider
          dots={false}
          infinite={true}
          autoplay={true}
          autoplaySpeed={10000}
          slidesToShow={1}
          slidesToScroll={1}
          adaptiveHeight={true}
          className="overflow-hidden"
        >
          {pageData.thumbnails?.map((thumbnail, index) => (
            <GatsbyImage
              className={styles.thumbnailImage}
              image={getImage(thumbnail)!!}
              alt=""
              key={index}
            />
          ))}
          {pageData.previewThumbnails?.map((thumbnail, index) => (
            <img
              className={styles.thumbnailImage}
              src={thumbnail}
              key={index}
            />
          ))}
        </Slider>
      </div>
      <div className={styles.mainContainer}>
        {!breakpoints.sm && (
          <span className={styles.currentPageName}>
            {pageData.breadcrumbs?.map((breadcrumb, index) => (
              <span key={index}>{breadcrumb}</span>
            ))}
          </span>
        )}
        {pageData.motto?.length === 3 ? (
          <div className={styles.mainTitle}>
            <div className={styles.mainTitleText}>
              <BubbleHeaderBackground className={styles.mainTitleBackground} />
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
