import { GatsbyNode } from "gatsby";
import { resolve } from "path";
import { PageData } from "./page-data";

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
  const imageResolver = {
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
  };

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
      image: imageResolver,
    },
    PagesJsonPageSectionsBubbles: {
      image: imageResolver,
    },
    PagesJsonPageSectionsItems: {
      image: imageResolver,
    },
    PagesJsonPageSectionsColumnsColumns: {
      image: imageResolver,
    },
    PagesJsonPageSectionsColumnsHeader: {
      image: imageResolver,
    },
    WorkshopsJsonThumbnail: {
      image: imageResolver,
    },
    WorkshopsJsonColumns: {
      image: imageResolver,
    },
  });
};
