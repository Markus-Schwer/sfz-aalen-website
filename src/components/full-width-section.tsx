import React, { FunctionComponent } from "react";

import styles from "./full-width-section.module.scss";

const FullWidthSection: FunctionComponent<any> = ({ children, className, style }) => {
  return (
    <div className={styles.fullWidthSection + " " + className} style={style}>
      <div className={styles.innerContainer}>
        <section className={styles.fullWidthSectionContent}>{children}</section>
      </div>
    </div>
  );
};

export default FullWidthSection;
