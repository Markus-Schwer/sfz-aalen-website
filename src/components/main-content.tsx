import React, { FunctionComponent } from "react";

import styles from "./main-content.module.scss";

import BubbleHeaderBackground from "../../public/bubble-header-background.svg";

type MainContentProps = {};

const MainContent: FunctionComponent<MainContentProps> = ({
  children
}) => {
  return (
    <div className={styles.mainContainer}>
      <span className={styles.currentPageName}>Home</span>
      <div className={styles.mainTitle}>
        <BubbleHeaderBackground className={styles.mainTitleBackground} height={230}/>
        <div className={styles.mainTitleText}>
          <span className={[styles.mainTitlePrimary, styles.mainTitleMedium].join(" ")}>Wissen.</span>
          <span className={[styles.mainTitleTertiary, styles.mainTitleSmall].join(" ")}>Schafft.</span>
          <span className={[styles.mainTitleSecondary, styles.mainTitleBig].join(" ")}>Spass!</span>
        </div>
      </div>
      <main>
        {children}
      </main>
    </div>
  );
};

export default MainContent;
