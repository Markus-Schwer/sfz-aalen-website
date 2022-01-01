import React, { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import useDarkMode from "use-dark-mode";

import { WorkshopsSection as WorkshopsSectionData } from "../../page-data";

import { Column, Row } from "../grid";
import FullWidthSection from "../full-width-section";
import ConditionalWrapper from "../conditional-wrapper";
import Card from "../card";

import * as styles from "./workflows-section.module.scss";
import { renderColumn } from "./section-utils";
import { calcDarkModeBackground } from "../../utils";

type WorkshopsSectionProps = {
  data: WorkshopsSectionData;
};

const WorkshopsSection: FunctionComponent<WorkshopsSectionProps> = ({
  data,
}) => {
  const darkMode = useDarkMode();

  let backgroundColor = data.backgroundColor;

  if (backgroundColor) {
    backgroundColor = darkMode.value
      ? calcDarkModeBackground(backgroundColor)
      : backgroundColor;
  }

  return (
    <ConditionalWrapper
      condition={!!backgroundColor}
      wrapper={(children) => (
        <FullWidthSection style={{ backgroundColor }}>
          {children}
        </FullWidthSection>
      )}
    >
      <section>
        <Row>
          {data.workshops
            .sort(
              (a, b) =>
                data.workshopOrder.indexOf(a.title) -
                data.workshopOrder.indexOf(b.title)
            )
            .map((workshop, index) => (
              <Column sm={12} md={12} lg={12} key={index}>
                <Card
                  header={workshop.header}
                  imageData={workshop.thumbnail?.image}
                  previewImage={workshop.thumbnail?.previewImage}
                  imageAlt={workshop.thumbnail?.altText}
                >
                  <Row>
                    {workshop.columns?.map((column, index) =>
                      renderColumn(
                        column,
                        index,
                        workshop.numberColumns,
                        "#fff"
                      )
                    )}
                  </Row>
                  <hr className={styles.divider} />
                  <ReactMarkdown className={styles.workshopInfo}>
                    {workshop.footer}
                  </ReactMarkdown>
                </Card>
              </Column>
            ))}
        </Row>
      </section>
    </ConditionalWrapper>
  );
};

export default WorkshopsSection;
