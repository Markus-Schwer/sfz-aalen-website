import React, { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";

import DropdownIcon from "../../images/dropdown-icon.svg";

import { AccordionSection as AccordionSectionData } from "../../page-data";
import { Row, Column } from "../grid";

import * as styles from "./accordion-section.module.scss";

type AccordionSectionProps = {
  data: AccordionSectionData;
};

const AccordionSection: FunctionComponent<AccordionSectionProps> = ({
  data,
}) => {
  return (
    <Row>
      {data.items?.map((item, index) => (
        <Column className={styles.accordionColumn} sm={12} md={12} lg={12} key={index}>
          <details className={styles.accordionItem}>
            <summary className={styles.summary}>
              {item.header}
              <DropdownIcon className={styles.dropdownIcon} />
            </summary>
            <ReactMarkdown className={styles.text}>{item.text}</ReactMarkdown>
          </details>
          <hr className={styles.accordionSeparator} />
        </Column>
      ))}
    </Row>
  );
};

export default AccordionSection;
