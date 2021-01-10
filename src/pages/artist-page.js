import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled  from 'styled-components'
// import { P, H2 , H6} from '../components/Frontend/Primitives';
import { device } from '../components/Frontend/FrontNav'
import SEO from '../components/seo';
import Pagination from '../components/Frontend/Pagination'
import Layout from '../components/Frontend/Layout'

const Background = styled.div`
    position: relatiive;
    background-color: var(--naturalLight);
    padding: 4px 4px;

    @media ${device.mobileS} {
        align-items: center;
        justify-items: right;
    }
`

const ArtistGridStyles = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 4rem;
    grid-auto-rows: auto auto 500px;
`;

const ArtistStyles = styled.div`
    display: grid;
    a {
        text-decoration: none;
    }
    .gatsby-image-wrapper {
        height: 400px;
    }
    @supports not (grid-template-rows: subgrid) {
        --rows: auto auto 1fr;
    }
    grid-template-rows: var(--rows, subgrid);
    grid-row: span 3;
    grid-gap: 1rem;
    h2, 
    h6,
    p {
        transform: rotate(-2deg);
        text-align: center;
        margin-bottom: -2rem;
        position: relative;
        z-index: 2;
        font-family: "Poppins", sans-serif;
        font-size: 26px;
        line-height: 14px;
    }
`;

export default function ArtistPage({ data, pageContext }) {
  const artists = data.artists.nodes;
  return (
    <Layout>
        <Background>

            <SEO title={`artist - Page ${pageContext.currentPage || 1}`} />
            <Pagination
                pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
                totalCount={data.artists.totalCount}
                currentPage={pageContext.currentPage || 1}
                skip={pageContext.skip}
                base="/artist-page"
            />
            <ArtistGridStyles>
                {artists.map((artist) => (
                <ArtistStyles key={artist.id}>
                    <Link to={`/artist/${artist.slug.current}`}>
                    <h2>
                        <span className="mark">{artist.name}</span>
                    </h2>
                    </Link>
                    <Img fluid={artist.image.asset.fluid} />
                    <p className="description">{artist.description}</p>
                </ArtistStyles>
                ))}
            </ArtistGridStyles>
        </Background>
    </Layout>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    artists: allSanityMusic(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;