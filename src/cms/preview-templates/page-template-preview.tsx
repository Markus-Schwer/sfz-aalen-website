import React, { FunctionComponent, useState } from "react";
import { PreviewTemplateComponentProps } from "netlify-cms-core";
import { BreakpointProvider } from "gatsby-plugin-breakpoints";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import {
  BubbleSection,
  ColumnSection,
  GridSection,
  PageData,
  WorkshopsSection,
} from "../../page-data";
import PageTemplate from "../../templates/page-template";

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
  function mapPreviewColumns(columns: any): ColumnSection["columns"][0] {
    return columns?.map(
      (column: any) =>
        ({
          ...column,
          previewImage: column.imageUrl ? getAsset(column.imageUrl).url : null,
          header:
            column.header != null
              ? {
                  ...column.header,
                  previewImage: column.header.imageUrl
                    ? getAsset(column.header.imageUrl).url
                    : null,
                }
              : null,
          columns: mapPreviewColumns(column.columns),
        } as ColumnSection["columns"][0])
    );
  }

  function mapPreviewImage<T extends { imageUrl?: string }>(
    objectWithImage: T
  ): (T & { previewImage?: string }) | undefined {
    return objectWithImage
      ? {
          ...objectWithImage,
          previewImage: objectWithImage.imageUrl
            ? getAsset(objectWithImage.imageUrl).url
            : undefined,
        }
      : undefined;
  }

  const entryData = entry.getIn(["data"]).toJS();
  const dummy = {} as any;

  const { loading, data: queryData } = useQuery(
    gql`
      query ($workshops: [String]!) {
        allWorkshopsJson(filter: { title: { in: $workshops } }) {
          nodes {
            title
            header
            thumbnail {
              altText
              imageUrl
            }
            numberColumns
            columns {
              type
              altText
              text
              imageUrl
            }
            footer
          }
        }
      }
    `,
    {
      variables: {
        workshops: (entryData.pageSections as any[])
          ?.flatMap((section: any) => section.workshops)
          ?.filter((section) => !!section),
      },
    }
  );

  const data: PageData = {
    ...entryData,
    previewThumbnails:
      entryData.thumbnailUrls?.map((path: string) => getAsset(path).url) || [],
    breadcrumbs: entryData.breadcrumbs,
    pageSections:
      entryData.pageSections?.map(
        (section: any) =>
          ({
            ...section,
            columns: mapPreviewColumns(section.columns),
            bubbles: section.bubbles?.map(
              (bubble: any) =>
                ({
                  ...mapPreviewImage(bubble),
                  image: bubble.imageUrl ? ({ extension: "svg" } as any) : null,
                } as BubbleSection["bubbles"][0])
            ),
            items: section.items?.map(
              (item: any) => mapPreviewImage(item) as GridSection["items"][0]
            ),
            workshopOrder: section.workshops,
            workshops:
              section.workshops != undefined && loading === false
                ? queryData?.allWorkshopsJson?.nodes
                    ?.filter((workshop: any) =>
                      (section.workshops as string[]).includes(workshop.title)
                    )
                    .map(
                      (workshop: any) =>
                        ({
                          ...workshop,
                          thumbnail: mapPreviewImage(workshop.thumbnail),
                          columns: mapPreviewColumns(workshop.columns),
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
        serverData={dummy}
      />
    </BreakpointProvider>
  );
};

export default PageTemplatePreview;
