import React, { FunctionComponent } from "react";
import { BigHeaderSection as BigHeaderSectionData } from "../../../gatsby-node";

import * as styles from "./big-header-section.module.scss";

type BigHeaderSectionProps = {
  data: BigHeaderSectionData;
}

const BigHeaderSection: FunctionComponent<BigHeaderSectionProps> = ({data}) => {
  return (
    <h1 className={styles.bigHeader}>{data.text}</h1>
  );
}

export default BigHeaderSection;
