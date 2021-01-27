const dotenv = require(`dotenv`);

dotenv.config({ path: '.env' });
// console.log(process.env.SANITY_TOKEN);

module.exports = {
  siteMetadata: {
    title: `Temunah Music`,
    description: `Promoting Musical Talents`,
    author: `@Daniel`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/logo.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'gbd938gi',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-54516992-1",
        head: true
      }
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: "https://gmail.us17.list-manage.com/subscribe/post?u=f1944ba4ef19adb37767acbe3&amp;id=0ca64b75f6"
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
