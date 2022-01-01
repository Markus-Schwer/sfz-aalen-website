import { GatsbyNode } from "gatsby";
import { GatsbyIterable } from "gatsby/dist/datastore/common/iterable"
import { resolve } from "path";
import { PageData } from "./src/page-data";

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
    resolve: async (source: any, args: any, context: any, info: any) => {
      return source.imageUrl ? await context.nodeModel.findOne({
        query: {
          filter: {
            relativePath: { eq: source.imageUrl },
          },
        },
        type: "File",
      }) : undefined;
    },
  };

  createResolvers({
    PagesJson: {
      thumbnails: {
        type: "[File]",
        resolve: async (source: any, args: any, context: any, info: any) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                relativePath: { in: source.thumbnailUrls },
              },
            },
            type: "File",
          });
          return entries;
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
    ArticlesJsonThumbnail: {
      image: imageResolver,
    },
    PagesJsonPageSections: {
      childrenWorkshops: {
        type: "[WorkshopsJson]",
        resolve: async (source: any, args: any, context: any, info: any) => {
          if (!source.workshops) return undefined;
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                title: { in: source.workshops },
              },
            },
            type: "WorkshopsJson",
          }, {
            connectionType: "WorkshopsJsonConnection"
          });
          return entries;
        }
      }
    }
  });
};
