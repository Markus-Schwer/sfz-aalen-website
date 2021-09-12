import React, { FunctionComponent } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";

import { PageData } from "../../gatsby-node";
import Header from "./header";
import Footer from "./footer";
import BubbleHeaderBackground from "../images/bubble-header-background.svg";

import * as styles from "./layout.module.scss";

import NavigationData from "../../content/navigation.json";
import { useBreakpoint } from "gatsby-plugin-breakpoints";

const MainImageContainer = styled.div.attrs(
  (props: { height: number }) => props
)`
  position: relative;
  height: ${(props) => props.height}em;
  overflow: hidden;
  margin-top: 7.5em;
`;

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
      <MainImageContainer height={pageData.path === "home" ? 41 : 28}>
        {pageData.thumbnails ? (
          <GatsbyImage
            className={styles.thumbnailImage}
            image={getImage(pageData.thumbnails[0])!!}
            alt=""
          />
        ) : (
          pageData.previewThumbnails && (
            <img
              className={styles.thumbnailImage}
              src={pageData.previewThumbnails[0]}
            />
          )
        )}
      </MainImageContainer>
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
              <BubbleHeaderBackground className={styles.mainTitleBackground}/>
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
