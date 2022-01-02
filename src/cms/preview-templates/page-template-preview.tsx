import React, { FunctionComponent } from "react";
import { PreviewTemplateComponentProps } from "netlify-cms-core";
import { BreakpointProvider } from "gatsby-plugin-breakpoints";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import {
  BubbleSection,
  GridSection,
  PageData,
  WorkshopsSection,
} from "../../page-data";
import PageTemplate from "../../templates/page-template";
import { mapPreviewColumns, mapPreviewImage } from "../../utils";

const defaultQueries = {
  xs: "(max-width: 320px)",
  sm: "(max-width: 720px)",
  md: "(max-width: 1024px)",
  l: "(max-width: 1536px)",
};

const PageTemplatePreview: FunctionComponent<PreviewTemplateComponentProps> = ({
  entry,
  getAsset,
}) => {
  const entryData = entry.getIn(["data"]).toJS();
  const dummy = {} as any;

  const workshops = (entryData.pageSections as any[])
    ?.flatMap((section: any) => section.workshops)
    ?.filter((section) => !!section)
    ?.map((workshopSlug) => ({
      ...require(`../../../content/workshops${workshopSlug}`),
      fields: { slug: workshopSlug },
    }));

  const data: PageData = {
    ...entryData,
    previewThumbnails:
      entryData.thumbnailUrls?.map((path: string) => getAsset(path).url) || [],
    breadcrumbs: entryData.breadcrumbs,
    pageSections: entryData.pageSections?.map(
      (section: any) =>
        ({
          ...section,
          columns: mapPreviewColumns(section.columns, getAsset),
          bubbles: section.bubbles?.map(
            (bubble: any) =>
              ({
                ...mapPreviewImage(bubble, getAsset),
                image: bubble.imageUrl ? ({ extension: "svg" } as any) : null,
              } as BubbleSection["bubbles"][0])
          ),
          items: section.items?.map(
            (item: any) =>
              mapPreviewImage(item, getAsset) as GridSection["items"][0]
          ),
          workshopOrder: section.workshops,
          workshops:
            section.workshops != undefined
              ? workshops
                  ?.filter((workshop: any) =>
                    (section.workshops as string[]).includes(
                      workshop.fields.slug
                    )
                  )
                  .map(
                    (workshop: any) =>
                      ({
                        ...workshop,
                        thumbnail: mapPreviewImage(
                          workshop.thumbnail,
                          getAsset
                        ),
                        columns: mapPreviewColumns(workshop.columns, getAsset),
                      } as WorkshopsSection["workshops"][0])
                  )
              : [],
        } as PageData["pageSections"][0])
    ),
  };

  return (
    <BreakpointProvider queries={defaultQueries}>
      <PageTemplate
        data={{ pagesJson: data }}
        path={data.path}
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

export default PageTemplatePreview;
