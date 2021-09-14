import React, { FunctionComponent } from "react";
import { PreviewTemplateComponentProps } from "netlify-cms-core";
import { BreakpointProvider } from "gatsby-plugin-breakpoints";

import Header from "../../components/header";

const defaultQueries = {
  xs: '(max-width: 320px)',
  sm: '(max-width: 720px)',
  md: '(max-width: 1024px)',
  l: '(max-width: 1536px)',
};

const NavigationPreview: FunctionComponent<PreviewTemplateComponentProps> = ({
  entry,
}) => {
  const data: any = entry.getIn(["data"]).toJS();

  return (
    <BreakpointProvider queries={defaultQueries}>
      <Header logoScrollEffect={false} navigationData={data} />
    </BreakpointProvider>
  );
};

export default NavigationPreview;
