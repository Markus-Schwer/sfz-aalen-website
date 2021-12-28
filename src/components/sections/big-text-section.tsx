import React, { FunctionComponent } from "react";
import { BigTextSection as BigTextSectionData } from "../../page-data";

import * as styles from "./big-text-section.module.scss";

type BigTextSectionProps = {
  data: BigTextSectionData;
}

const BigTextSection: FunctionComponent<BigTextSectionProps> = ({data}) => {
  return (
    <p className={styles.bigText}>{data.text}</p>
  );
}

export default BigTextSection;
