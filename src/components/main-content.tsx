import React, { FunctionComponent } from "react";

import styles from "./main-content.module.scss";

import BubbleHeaderBackground from "../../public/bubble-header-background.svg";

const mainTitleColorMap = {
  "primary": styles.mainTitlePrimary,
  "secondary": styles.mainTitleSecondary,
  "tertiary": styles.mainTitleTertiary
};

const mainTitleSizeMap = {
  "small": styles.mainTitleSmall,
  "medium": styles.mainTitleMedium,
  "big": styles.mainTitleBig
};

type MainContentProps = {
  motto: {
    mottoText: string,
    color: "primary" | "secondary" | "tertiary",
    size: "small" | "medium" | "big"
  }[];
  breadcrumbs: string[]
};

const MainContent: FunctionComponent<MainContentProps> = ({
                                                            children,
                                                            motto,
                                                            breadcrumbs
                                                          }) => {
  return (
    <div className={styles.mainContainer}>
      <span className={styles.currentPageName}>
        {breadcrumbs.map((breadcrumb, index) => (
          <span key={index}>{breadcrumb}</span>
        ))}
      </span>
      {motto.length == 3 ? (
          <div className={styles.mainTitle}>
            <BubbleHeaderBackground className={styles.mainTitleBackground} height={230}/>
            <div className={styles.mainTitleText}>
              <span
                className={[mainTitleColorMap[motto[0].color], mainTitleSizeMap[motto[0].size]].join(" ")}>{motto[0].mottoText}</span>
              <span
                className={[mainTitleColorMap[motto[1].color], mainTitleSizeMap[motto[1].size]].join(" ")}>{motto[1].mottoText}</span>
              <span
                className={[mainTitleColorMap[motto[2].color], mainTitleSizeMap[motto[2].size]].join(" ")}>{motto[2].mottoText}</span>
            </div>
          </div>
        )
        : null
      }
      <main>
        {children}
      </main>
    </div>
  );
};

export default MainContent;
