/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);
// const resolve = require(`path`).resolve;
// const fs = require('fs');
// const mkdirp = require('mkdirp')

async function artistsPageCreation({ graphql, actions }) {
    const { createPage } = actions;
    // 2. Query all pages
    const { data } = await graphql(`
        query {
            artists: allSanityMusic {
                totalCount
                pageInfo {
                    pageCount
                }
                nodes {
                    name
                    slug {
                        current
                    }
                }
            }
        }
    `);
    // console.log(data);
    const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
    console.log(pageSize)
    const pageCount = Math.ceil(data.artists.totalCount / pageSize);
    
    console.log(
        `There are ${data.artists.totalCount} total people. And we have ${pageCount} pages with ${pageSize} per page`
      );

    // 3. Loop over each item and create a page for that item
    Array.from({ length: pageCount }).forEach((_, i) => {
        console.log(`Creating page ${i}`);
        actions.createPage({ 
            path: `/artist-page/${i + 1}`,
            component: path.resolve('./src/pages/artist-page.js'),
            context: {
                skip: i + pageSize,
                currentPage: i + 1,
                pageSize,
            }
        })
    })
    
    data.artists.nodes.forEach((artist) => {
        createPage({
            //URL for the page
            path: `artist/${artist.slug.current}`,
            component: path.resolve('./src/templates/artist-page.js'),
            context: {
                slug: artist.slug.current,
            },
        });
    });
}

async function advertPageCreation({ graphql, actions }) {
    const { createPage } = actions;
    // 1. Get a template for this item
    const advertTemplate = path.resolve('./src/templates/advert-page.js')                                          
    // 2. Query all pages
    const { data } = await graphql(`
        query {
            adverts: allSanityAdvert {
                nodes {
                    name
                    slug {
                        current
                    }
                }
            }
        }
    `);
    // console.log(data);
    // 3. Loop over each item and create a page for that item
    const createdAdverts = data.adverts.nodes.forEach((advert) => {
        console.log('Creating pages for', advert.name);

        createPage({
            //URL for the page
            path: `advert/${advert.slug.current}`,
            component: advertTemplate,
            context: {
                slug: advert.slug.current,
            },
        });
    });

    return createdAdverts;
}

exports.createPages = async (params) => {
    // console.log("CREATING PAGESSSSSSSSSSSSSSSSSSSSSSSSSSSS");
    // console.log("CREATING PAGESSSSSSSSSSSSSSSSSSSSSSSSSSSS");
    // console.log("CREATING PAGESSSSSSSSSSSSSSSSSSSSSSSSSSSS");
    // Create pages synamically
    // 1. Posts
    await Promise.all([
                        artistsPageCreation(params),
                        advertPageCreation(params)
                    ]);
}