import React, { FunctionComponent } from "react";
import { PreviewTemplateComponentProps } from "netlify-cms-core";
import { BreakpointProvider } from "gatsby-plugin-breakpoints";

import { WorkshopsSection } from "../../components";
import { WorkshopsSection as WorkshopsSectionData } from "../../page-data";
import {
  calcDarkModeBackground,
  mapPreviewColumns,
  mapPreviewImage,
} from "../../utils";
import useDarkMode from "use-dark-mode";

const defaultQueries = {
  xs: "(max-width: 320px)",
  sm: "(max-width: 720px)",
  md: "(max-width: 1024px)",
  l: "(max-width: 1536px)",
};

const WorkshopPreview: FunctionComponent<PreviewTemplateComponentProps> = ({
  entry,
  getAsset,
}) => {
  const darkMode = useDarkMode();
  const entryData: any = entry.getIn(["data"]).toJS();

  const data: WorkshopsSectionData = {
    type: "workshopsSection",
    workshopOrder: [entryData.title],
    backgroundColor: "#d4edfc",
    workshops: [
      {
        ...entryData,
        thumbnail: mapPreviewImage(entryData.thumbnail, getAsset),
        columns: mapPreviewColumns(entryData.columns, getAsset),
      },
    ],
  };

  const backgroundColor = darkMode.value
    ? calcDarkModeBackground(data.backgroundColor as string)
    : data.backgroundColor;

  return (
    <BreakpointProvider queries={defaultQueries}>
      <div style={{ marginTop: "-6.25em", height: "100vh", backgroundColor }}>
        <WorkshopsSection data={data} />
      </div>
    </BreakpointProvider>
  );
};

export default WorkshopPreview;
