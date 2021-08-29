import { GatsbyNode } from "gatsby";
import { resolve } from "path";
import { ImageDataLike } from "gatsby-plugin-image";

export interface PageData {
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
}

interface QueryResult {
  allPagesJson: {
    edges: {
      node: PageData;
    }[];
  };
}

/**
 * Gatsby exposes interfaces for every lifecycle hook
 */
export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;

  // Ensure the path now points to TSX template
  const blogPostTemplate = resolve(`./src/templates/page-template.tsx`);

  /**
   * Pass the query structure generic for complete type-check coverage
   */
  const result = await graphql<QueryResult>(`
    {
      allPagesJson {
        edges {
          node {
            title
            path
            breadcrumbs
            motto {
              text
              size
              color
            }
          }
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

  const pages = result.data.allPagesJson.edges;

  pages.forEach((post: any) => {
    createPage({
      path: post.node.path,
      component: blogPostTemplate,
      context: {},
    });
  });
};

export const createResolvers: GatsbyNode["createResolvers"] = ({createResolvers}) => {
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
            firstOnly: false
          });
        },
      },
    },
  });
};
