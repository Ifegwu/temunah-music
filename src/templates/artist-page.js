import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Frontend/Layout'
import styled from 'styled-components';
import TwitterSocial from "../components/Frontend/Newsletter/TwitterSocial"
import FacebookSocial from "../components/Frontend/Newsletter/FacebookSocial"
import InstagramSocial from "../components/Frontend/Newsletter/InstagramSocial"
import PublicMusic from '../components/Frontend/PublicTrack/PublicMusic';
import { H6 } from '../components/Frontend/Primitives'

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
const SmallDivPad = styled.div`
    padding-top: 8px;
`
const PlayerPad = styled.div`
    padding-top: 120px;
    background-color: var(--secondary2)
`

const SocialLogo = styled.div`
    padding: 2px;
    a {
        padding: 8px;
    }
    svg {
    margin-right: 20px;
    fill: var(--green);
    box-shadow: var(--boxShadow);
    border-radius: 50%;
    transition: all 0.25s linear;

    &:hover {
      box-shadow: var(--boxShadowHover);
      transform: var(--transform);
    }
`

const ArtistPage = ({ data }) => {
    const { artist } = data;
    console.log(artist.name);
    return (
        <Layout>
            <>
                <ArtistGrid>
                    <Img fluid={artist.image.asset.fluid} />
                    <Div>
                        <H2 className="mark">
                            <strong>{artist.name}</strong>
                        </H2>
                        <Div><strong>Album:</strong> {artist.albums.name}</Div>
                        <Div>
                            <strong>By:</strong> {artist.artist.join(', ft: ')}
                        </Div>
                        <H6><strong>{artist.description}</strong></H6>
                        <SocialLogo>
                            <Link to={artist.person.facebook}><FacebookSocial /></Link>
                            <Link to={artist.person.instagram}><InstagramSocial /></Link>
                            <Link to={artist.person.twitter}><TwitterSocial /></Link>
                        </SocialLogo>   
                    </Div>
                    <SmallDivPad>
                        <strong>Place your Advertisements Here</strong>
                    </SmallDivPad>
                </ArtistGrid>
                <PlayerPad>
                    <strong>Search all Tracks Here</strong>
                    <PublicMusic />                
                </PlayerPad>
            </>
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
        artist: sanityMusic(
            slug: { current: {eq: $slug} }
        ) {
            name
            image {
                asset {
                    fluid(maxWidth: 800) {
                        ...GatsbySanityImageFluid
                    }
                }
            }
            description
            artist
            albums {
                name
            }
            person {
                facebook
                instagram
                twitter
            }
        }
    }
`

export default ArtistPage