import { FunctionComponent } from "react";

import styles from "./big-header-section.module.scss";
import { BigHeaderSectionType } from "../../pages/[filename]";

type BigHeaderSectionProps = {
  pageSection: BigHeaderSectionType
}

const BigHeaderSection: FunctionComponent<BigHeaderSectionProps> = ({pageSection}) => {
  return <h1 className={styles.bigHeader}>{pageSection.headerText}</h1>;
}

export default BigHeaderSection;
