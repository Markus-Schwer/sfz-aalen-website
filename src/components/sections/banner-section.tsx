import React, { FunctionComponent } from "react";
import { Link } from "gatsby";

import { BannerSection as BannerSectionData } from "../../page-data";

import BannerSymbols from "../../images/banner-symbols.svg";
import ConditionalWrapper from "../conditional-wrapper";

import * as styles from "./banner-section.module.scss";

export interface BannerSectionProps {
  data: BannerSectionData;
}

const colorNameMap = {
  primary: styles.primary,
  secondary: styles.secondary,
  tertiary: styles.tertiary,
};

const BannerSection: FunctionComponent<BannerSectionProps> = ({ data }) => {
  return (
    <ConditionalWrapper
      condition={!!data.href}
      wrapper={(children) => <Link className={styles.bannerLink} to={data.href!!}>{children}</Link>}
    >
      <div className={`${styles.banner} ${colorNameMap[data.color]}`}>
        <BannerSymbols />
        <h1>{data.mainText}</h1>
        <h2>{data.subText}</h2>
      </div>
    </ConditionalWrapper>
  );
};

export default BannerSection;
