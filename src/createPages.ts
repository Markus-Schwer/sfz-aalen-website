import { GatsbyNode } from "gatsby";

const createPages: GatsbyNode["createPages"] = async ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allPagesJson {
        edges {
          node {
            id
            path
          }
        }
      }
    }
  `).then((result: any) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allPagesJson.edges.forEach(({ node }: any) => {
      createPage({
        path: node.path,
        component: "./templates/page-template",
        context: {
          id: node.id
        },
      });
    });
  });
};

export default createPages;
