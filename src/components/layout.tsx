import React, { FunctionComponent } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";

import { PageData } from "../../gatsby-node";
import Header from "./header";
import Footer from "./footer";
import BubbleHeaderBackground from "../images/bubble-header-background.svg";

import * as styles from "./layout.module.scss";

const MainImageContainer = styled.div.attrs(
  (props: { height: number }) => props
)`
  position: relative;
  height: ${(props) => props.height}px;
  overflow: hidden;
  margin-top: 120px;
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
  return (
    <div>
      <Header logoScrollEffect={pageData.path === "home"} />
      <MainImageContainer height={pageData.path === "home" ? 666 : 450}>
        {pageData.thumbnails ? (
          <GatsbyImage image={getImage(pageData.thumbnails[0])!!} alt="" />
        ) : (
          pageData.previewThumbnails && (
            <img
              className={styles.previewImage}
              src={pageData.previewThumbnails[0]}
            />
          )
        )}
      </MainImageContainer>
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
