import { GatsbyNode } from "gatsby";
import { resolve } from "path";
import { ImageDataLike } from "gatsby-plugin-image";

export interface BigHeaderSection {
  type: "bigHeaderSection";
  text: string;
}

export interface BigTextSection {
  type: "bigTextSection";
  text: string;
}

export interface HeaderOnlySection {
  type: "headerOnlySection";
  sectionId?: string;
  mainHeader: string;
  subHeader: string;
  divider: boolean;
}

export interface ImageColumn {
  type: "image";
  image?: ImageDataLike;
  imageUrl?: string;
  previewImage?: string;
  altText: string;
}

export interface ParagraphColumn {
  type: "paragraph";
  text: string;
}

export interface DividerColumn {
  type: "divider";
  divider: boolean;
}

export interface ColumnSection {
  type: "columnSection";
  backgroundColor?: string;
  textColor: string;
  header: {
    divider: boolean;
    sectionId?: string;
    mainHeader: string;
    subHeader: string;
  };
  numberColumns: number;
  columns: ImageColumn[] | ParagraphColumn[] | DividerColumn[];
}

export type BubbleSection = {
  type: "bubbleSection";
  numberColumns: number;
  backgroundColor?: string;
  bubbles: {
    text: string;
    image?: { publicURL: string; extension: string } & ImageDataLike;
    imageUrl?: string;
    previewImage?: string;
    color: "primary" | "secondary" | "tertiary";
    href?: string;
  }[];
};

export interface GridSection {
  type: "gridSection";
  items: {
    image?: ImageDataLike;
    imageUrl?: string;
    previewImage?: string;
    altText: string;
    description: string;
  }[];
}

export interface BannerSection {
  type: "bannerSection";
  color: "primary" | "secondary" | "tertiary";
  mainText: string;
  subText: string;
  href?: string;
}

export interface PageData {
  id?: string;
  title: string;
  path: string;
  thumbnails?: ImageDataLike[];
  thumbnailUrls?: string[];
  previewThumbnails?: string[];
  breadcrumbs: string[];
  motto: {
    text: string;
    size: string;
    color: string;
  }[];
  pageSections:
    | BigHeaderSection[]
    | BigTextSection[]
    | HeaderOnlySection[]
    | ColumnSection[]
    | BubbleSection[]
    | GridSection[]
    | BannerSection[];
}

interface QueryResult {
  allPagesJson: {
    nodes: PageData[];
  };
}

/**
 * Gatsby exposes interfaces for every lifecycle hook
 */
export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage, createRedirect } = actions;

  createRedirect({
    fromPath: "/",
    toPath: "/home",
    isPermanent: true,
    redirectInBrowser: true,
  });

  // Ensure the path now points to TSX template
  const pageTemplate = resolve(`./src/templates/page-template.tsx`);

  /**
   * Pass the query structure generic for complete type-check coverage
   */
  const result = await graphql<QueryResult>(`
    {
      allPagesJson {
        nodes {
          id
          title
          path
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  if (!result.data) {
    throw new Error("ERROR: Could not fetch pages on build");
  }

  const pages = result.data.allPagesJson.nodes;

  pages.forEach((page) => {
    createPage({
      path: page.path,
      component: pageTemplate,
      context: {
        id: page.id,
      },
    });
  });
};

export const createResolvers: GatsbyNode["createResolvers"] = ({
  createResolvers,
}) => {
  createResolvers({
    PagesJson: {
      thumbnails: {
        type: "[File]!",
        resolve(source: any, args: any, context: any, info: any) {
          return context.nodeModel.runQuery({
            query: {
              filter: {
                relativePath: { in: source.thumbnailUrls },
              },
            },
            type: "File",
            firstOnly: false,
          });
        },
      },
    },
    PagesJsonPageSectionsColumns: {
      image: {
        type: "File",
        resolve(source: any, args: any, context: any, info: any) {
          return context.nodeModel.runQuery({
            query: {
              filter: {
                relativePath: { eq: source.imageUrl },
              },
            },
            type: "File",
            firstOnly: true,
          });
        },
      },
    },
    PagesJsonPageSectionsBubbles: {
      image: {
        type: "File",
        resolve(source: any, args: any, context: any, info: any) {
          return context.nodeModel.runQuery({
            query: {
              filter: {
                relativePath: { eq: source.imageUrl },
              },
            },
            type: "File",
            firstOnly: true,
          });
        },
      },
    },
    PagesJsonPageSectionsItems: {
      image: {
        type: "File",
        resolve(source: any, args: any, context: any, info: any) {
          return context.nodeModel.runQuery({
            query: {
              filter: {
                relativePath: { eq: source.imageUrl },
              },
            },
            type: "File",
            firstOnly: true,
          });
        },
      },
    },
  });
};
