import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Frontend/Layout'
import styled from 'styled-components';

const ArtistGrid = styled.div`
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    padding-top: 120px;
    padding-left: 4px;
    padding-bottom: 4px;
`;
const H2 = styled.h2`
    padding-top: 16px;
    font-family: "Poppins", sans-serif;
    font-size: 26px;
    line-height: 14px;
`

const Div = styled.div`
    padding-top: 16px;
`

 

const AdvertPage = ({ data }) => {
    const { advert } = data;
    console.log(advert.name);
    return (
        <Layout>
            <ArtistGrid>
                <Img fluid={advert.image.asset.fluid} />
                <Div>
                    <H2 className="mark">
                        <strong>{advert.name}</strong>
                    </H2>
                    <p>{advert.description}</p>  
                </Div>
            </ArtistGrid>
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
        advert: sanityAdvert(
            slug: { current: {eq: $slug} } 
        ) {
        image {
            asset {
                fluid(maxWidth: 800) {
                    ...GatsbySanityImageFluid
                }
            }
        }
        slug {
            current
        }
        name
        description
        }
    }
`

export default AdvertPage;