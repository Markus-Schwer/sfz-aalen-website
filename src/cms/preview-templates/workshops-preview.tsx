import React, { FunctionComponent } from "react";
import { PreviewTemplateComponentProps } from "netlify-cms-core";
import { BreakpointProvider } from "gatsby-plugin-breakpoints";

import Workshops, { WorkshopsProps } from "../../pages/workshops";

const defaultQueries = {
  xs: "(max-width: 320px)",
  sm: "(max-width: 720px)",
  md: "(max-width: 1024px)",
  l: "(max-width: 1536px)",
};

const WorkshopsPreview: FunctionComponent<PreviewTemplateComponentProps> = ({
  entry,
  getAsset,
}) => {
  const entryData = entry.getIn(["data"]).toJS();
  const dummy = {} as any;

  const data: WorkshopsProps = {
    allWorkshopsJson: {
      nodes: [
        {
          title: entryData.title,
          thumbnail: {
            altText: entryData.thumbnail.altText,
            previewImage: getAsset(entryData.thumbnail.imageUrl).url,
          },
          header: entryData.header,
          numberColumns: entryData.numberColumns,
          columns: entryData.columns?.map((column: any) => {
            if (column.type === "image") {
              return {
                type: "image",
                altText: column.altText,
                previewImage: getAsset(column.imageUrl).url,
              };
            } else return column;
          }) || [],
          footer: entryData.footer,
        },
      ],
    },
    previewThumbnails: [getAsset("images/uploads/workshops-thumbnail.jpg").url],
  };

  return (
    <BreakpointProvider queries={defaultQueries}>
      <Workshops
        data={data}
        path="workshops"
        location={dummy}
        uri={dummy}
        navigate={dummy}
        children={dummy}
        params={dummy}
        pageResources={dummy}
        pageContext={dummy}
      />
    </BreakpointProvider>
  );
};

export default WorkshopsPreview;
