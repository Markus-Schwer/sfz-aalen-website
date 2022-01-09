import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  article?: {
    first_publication_date: string;
    last_publication_date: string;
  };
};

const SEO: FunctionComponent<SEOProps> = ({
  title,
  description,
  image,
  article,
}) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(query);

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    headline,
    siteUrl,
    defaultImage,
    organization,
    siteLanguage,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  // schema.org in JSONLD format
  // https://developers.google.com/search/docs/guides/intro-structured-data

  const schemaOrgWebPage = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    url: siteUrl,
    headline,
    inLanguage: siteLanguage,
    mainEntityOfPage: `${siteUrl}/home`,
    description: defaultDescription,
    name: defaultTitle,
    image: {
      "@type": "ImageObject",
      url: `${siteUrl}${defaultImage}`,
    },
  };

  // Initial breadcrumb list
  const itemListElement = [
    {
      "@type": "ListItem",
      item: {
        "@id": `${siteUrl}/home`,
        name: "Homepage",
      },
      position: 1,
    },
  ];

  let schemaArticle = null;

  if (article) {
    schemaArticle = {
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      publisher: {
        "@type": "Organization",
        name: organization,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}${defaultImage}`,
        },
      },
      datePublished: article.first_publication_date,
      dateModified: article.last_publication_date,
      description: seo.description,
      headline: title,
      inLanguage: siteLanguage,
      url: seo.url,
      name: seo.title,
      image: {
        "@type": "ImageObject",
        url: seo.image,
      },
      mainEntityOfPage: seo.url,
    };

    // Push current article into breadcrumb list
    itemListElement.push({
      "@type": "ListItem",
      item: {
        "@id": seo.url,
        name: seo.title,
      },
      position: 2,
    });
  }

  const breadcrumb = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <Helmet title={seo.title} titleTemplate={titleTemplate}>
      <html lang={siteLanguage} />
      <meta charSet="utf-8" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {article && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}
      {/* Insert schema.org data conditionally (webpage/article) + everytime (breadcrumbs) */}
      {article == undefined ? (
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgWebPage)}
        </script>
      ) : (
          <script type="application/ld+json">
            {JSON.stringify(schemaArticle)}
          </script>
      )}
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
    </Helmet>
  );
};

export default SEO;

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        headline
        siteUrl
        defaultImage: image
        organization
        siteLanguage
      }
    }
  }
`;
