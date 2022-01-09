const siteUrl = process.env.URL || "https://sfz-aalen.netlify.app";

module.exports = {
  siteMetadata: {
    title: "SFZ Aalen",
    titleTemplate: "%s | SFZ Aalen",
    headline: "Das Schülerforschungszentrum der Hochschule Aalen",
    description:
      "Interessierst du dich dafür, wie Dinge funktionieren? Tüftelst, experimentierst und forscht du gerne? Dann bist du bei uns richtig!",
    siteUrl,
    image: "/logo.png",
    organization: "SFZ Aalen",
    siteLanguage: "de",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "SFZ Aalen",
        short_name: "SFZ Aalen",
        start_url: "/home",
        theme_color: "#134094",
        display: "standalone",
        icon: "src/images/icon.png",
        cache_busting_mode: "name",
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
          siteBuildMetadata {
            buildTime
          }
          allFile(
            filter: {sourceInstanceName: {in: ["pages", "articles"]}, extension: {eq: "json"}}
          ) {
            nodes {
              birthTime
              modifiedTime
              page: childPagesJson {
                path
              }
              article: childArticlesJson {
                fields {
                  slug
                }
              }
            }
          }
        }        
      `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({
          allSitePage: { nodes: allPages },
          siteBuildMetadata: { buildTime },
          allFile: { nodes: allNodes },
        }) => {
          const nodeMap = allNodes.reduce((acc, node) => {
            if (node.page) {
              acc["/" + node.page.path] = node;
            } else if (node.article) {
              acc["/aktuelles" + node.article.fields.slug] = node;
            }

            return acc;
          }, {});

          return allPages.map((page) => {
            return {
              ...page,
              ...(nodeMap[page.path] || { modifiedTime: buildTime }),
            };
          });
        },
        serialize: ({ path, modifiedTime }) => {
          return {
            url: path,
            lastmod: modifiedTime,
          };
        },
      },
    },
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-transformer-sharp",
      options: {
        checkSupportedExtensions: false,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-typescript",
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.svg$/,
        },
      },
    },
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./content/pages/",
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./content/articles/",
        name: "articles",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./content",
        name: "content",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "static",
        path: "./static",
      },
      __key: "static",
    },
    "gatsby-transformer-json",
    "gatsby-plugin-breakpoints",
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: "./src/cms/netlify-cms.ts",
      },
    },
    {
      resolve: "gatsby-plugin-use-dark-mode",
      options: {
        classNameDark: "dark-mode",
        classNameLight: "light-mode",
        storageKey: "darkMode",
        minify: true,
      },
    },
    "gatsby-plugin-netlify",
  ],
};
