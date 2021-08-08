import React, { FunctionComponent } from "react";

import styles from "./main-content.module.scss";

import BubbleHeaderBackground from "../../public/bubble-header-background.svg";
import { InlineGroup } from "react-tinacms-inline";

const mainTitleColorMap: any = {
  "primary": styles.mainTitlePrimary,
  "secondary": styles.mainTitleSecondary,
  "tertiary": styles.mainTitleTertiary
};

const mainTitleSizeMap: any = {
  "small": styles.mainTitleSmall,
  "medium": styles.mainTitleMedium,
  "big": styles.mainTitleBig
};

type MainContentProps = {
  data: {
    motto: {
      mottoText: string,
      color: "primary" | "secondary" | "tertiary",
      size: "small" | "medium" | "big"
    }[];
    breadcrumbs: string[]
  }
};

const MainContent: FunctionComponent<MainContentProps> = ({data, children}) => {
  return (
    <div className={styles.mainContainer}>
      <span className={styles.currentPageName}>
        <InlineGroup name="" fields={breadcrumbsFields}>
          {data.breadcrumbs?.map((breadcrumb, index) => (
            <span key={index}>{breadcrumb}</span>
          ))}
        </InlineGroup>
      </span>
      {data.motto?.length == 3 ? (
        <div className={styles.mainTitle}>
          <BubbleHeaderBackground className={styles.mainTitleBackground} height={230}/>
          <div className={styles.mainTitleText}>
            {data.motto.map((motto: any, index: number) => (
              <InlineGroup name={`motto.${index}`} fields={mottoFields} key={index}>
                  <span
                    className={[mainTitleColorMap[motto.color], mainTitleSizeMap[motto.size]].join(" ")}>{motto.mottoText}</span>
              </InlineGroup>
            ))}
          </div>
        </div>
      ) : null}
      <main>
        {children}
      </main>
    </div>
  );
};

const breadcrumbsFields: any[] = [
  {
    name: "breadcrumbs",
    list: "Breadcrumbs",
    component: "list",
    field: {
      component: "text"
    }
  }
];

const mottoFields: any[] = [
  {
    label: "Text",
    name: "mottoText",
    component: "text"
  },
  {
    label: "Farbe",
    name: "color",
    component: "select",
    options: ["primary", "secondary", "tertiary"]
  },
  {
    label: "Größe",
    name: "size",
    component: "select",
    options: ["small", "medium", "big"]
  }
];

export default MainContent;
