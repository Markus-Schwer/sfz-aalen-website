module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "SFZ Aalen",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
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
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.svg$/
        }
      }
    },
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./content/pages/",
        name: "pages"
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
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: "./src/cms/netlify-cms.ts",
      },
    },
    "gatsby-plugin-netlify" // make sure to keep it last in the array
  ],
  pathPrefix: "/sfz-aalen-website" // only for GitHub Pages
};