import { GatsbyNode } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";
import { resolve } from "path";
import { ArticleData, PageData } from "./src/page-data";

interface QueryResult {
  allPagesJson: {
    nodes: PageData[];
  };
  allArticlesJson: {
    nodes: ArticleData[];
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
  const articleTemplate = resolve(`./src/templates/article-template.tsx`);

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
      allArticlesJson {
        nodes {
          id
          title
          fields {
            slug
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

  const articles = result.data.allArticlesJson.nodes;

  articles.forEach((article) => {
    createPage({
      path: "aktuelles/" + article.fields.slug,
      component: articleTemplate,
      context: {
        id: article.id,
        slug: article.fields.slug,
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
      return source.imageUrl
        ? await context.nodeModel.findOne({
            query: {
              filter: {
                relativePath: { eq: source.imageUrl },
              },
            },
            type: "File",
          })
        : undefined;
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
          const { entries } = await context.nodeModel.findAll(
            {
              query: {
                filter: {
                  fields: { slug: { in: source.workshops } },
                },
              },
              type: "WorkshopsJson",
            },
            {
              connectionType: "WorkshopsJsonConnection",
            }
          );
          return entries;
        },
      },
    },
  });
};

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  getNode,
  actions,
}) => {
  const { createNodeField } = actions;
  switch (node.internal.type) {
    case "ArticlesJson":
      createNodeField({
        node,
        name: "slug",
        value: createFilePath({
          node,
          getNode,
          basePath: "articles",
          trailingSlash: false,
        }).substring(1), // remove leading slash
      });
      break;
    case "WorkshopsJson":
      createNodeField({
        node,
        name: "slug",
        value: createFilePath({
          node,
          getNode,
          basePath: "workshops",
          trailingSlash: false,
        }),
      });
      break;
    default:
      break;
  }
};
