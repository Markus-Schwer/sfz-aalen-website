import React, { FunctionComponent } from "react";

import IconBubble from "../icon-bubble";

import styles from "./icon-bubble-section.module.scss";
import { BlockComponentProps, BlocksControls, InlineGroup } from "react-tinacms-inline";
import { Field } from "tinacms";

const IconBubbleSection: FunctionComponent<BlockComponentProps> = ({data, index}) => {
  const numberOfColumns = data.numberColumns || 2;
  const columnWidth = 100 / numberOfColumns;
  return (
    <BlocksControls index={index}>
      <InlineGroup name="" fields={IconBubbleFields}>
        <div className={styles.iconBubbleContainer} style={{flexBasis: `${columnWidth}%`}}>
          {data.bubbles.map((bubble: any, i: number) => (
            <IconBubble
              icon={bubble.icon}
              text={bubble.text}
              color={bubble.backgroundColor}
              columnWidth={columnWidth}
              href={bubble.href}
              key={i}
            />
          ))}
        </div>
      </InlineGroup>
    </BlocksControls>
  );
}

const IconBubbleFields: Field[] = [
  {
    label: "Anzahl Spalten",
    name: "numberColumns",
    component: "number",
    defaultValue: 2
  },
  {
    name: "bubbles",
    label: "Icon Blasen",
    component: "group-list",
    defaultValue: [],
    fields: [
      {
        label: "Text",
        name: "text",
        component: "text",
        defaultValue: "Text"
      },
      {
        label: "Farbe",
        name: "backgroundColor",
        component: "select",
        options: ["primary", "secondary", "tertiary"],
        defaultValue: "tertiary"
      },
      {
        label: "Icon",
        name: "icon",
        component: "image",
        defaultValue: "/microscope.svg"
      },
      {
        label: "Link",
        name: "href",
        component: "text"
      }
    ]
  }
];

export default IconBubbleSection;
