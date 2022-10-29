import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export default function SEO({ children, location, description, title, image }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          image
          keywords
          url
        }
      }
    }
  `);
  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{site.siteMetadata.title}</title>
      {/* Fav Icons */}
      <link rel="icon" type="image/svg+xml" href={site.siteMetadata.image}  />
      <link rel="alternate icon" href={site.siteMetadata.image} />
      <link rel="canonical" href={site.siteMetadata.url} />
      {/* Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta name="description" content={site.siteMetadata.description} />
      {/* Open Graph */}
      {location && <meta property="og:url" content={site.siteMetadata.url} />}
      <meta property="og:image" content={site.siteMetadata.image || '/logo.svg'} />
      <meta property="og:title" content={site.siteMetadata.title} key="ogtitle" />
      <meta property="og:keywords" content={site.siteMetadata.keywords} />
      <meta
        propery="og:site_name"
        content={site.siteMetadata.title}
        key="ogsitename"
      />
      <meta property="og:description" content={site.siteMetadata.description} key="ogdesc" />
      {children}
    </Helmet>
  );
}