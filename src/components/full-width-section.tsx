import React, { FunctionComponent } from "react";

import styles from "./full-width-section.module.scss";

const FullWidthSection: FunctionComponent<any> = ({ children, className }) => {
  return (
    <div className={styles.fullWidthSection + " " + className}>
      <section className={styles.fullWidthSectionContent}>{children}</section>
    </div>
  );
};

export default FullWidthSection;
