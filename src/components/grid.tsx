import React, { FunctionComponent } from "react";

import * as styles from "./grid.module.scss";

type GridItemsAlignment =
  | "FlexStart"
  | "Center"
  | "FlexEnd"
  | "Stretch"
  | "Baseline";

type GridJustify =
  | "flexStart"
  | "center"
  | "flexEnd"
  | "spaceBetween"
  | "spaceAround"
  | "spaceEvenly";

type GridSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface RowProps {
  className?: string;
  alignItems?: GridItemsAlignment;
  expanded?: boolean;
  justify?: GridJustify;
}

const Row: FunctionComponent<RowProps> = ({
  className,
  alignItems,
  children,
  expanded,
  justify,
}) => {
  const classes: string =
    styles.row +
    (expanded ? ` ${styles.expanded}` : "") +
    (justify ? ` ${styles[justify]}` : "") +
    (alignItems ? ` ${styles["align" + alignItems]}` : "");

  return <div className={`${className || ""} ${classes}`}>{children}</div>;
};

interface ColumnProps {
  className?: string;
  lg?: GridSizes;
  md?: GridSizes;
  sm?: GridSizes;
  gap?: number;
}

const Column: FunctionComponent<ColumnProps> = ({
  className,
  children,
  lg,
  md,
  sm,
}) => {
  const classes: string =
    styles.column +
    (sm ? ` ${styles["sm" + sm]}` : "") +
    (md ? ` ${styles["md" + md]}` : "") +
    (lg ? ` ${styles["lg" + lg]}` : "");

  return <div className={`${className || ""} ${classes}`}>{children}</div>;
};

export { Row, Column };