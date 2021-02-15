import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled  from 'styled-components'
import { P, H2 , H6} from './Primitives';
import { device } from './FrontNav'

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

const ArtistStyle = styled.div`
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
    transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    &:hover {
        transform: scale(1.1, 1.1);
    }
`;

const H2Modified = styled(H2)`
    align-items: center;
    justify-items: center;
    padding-bottom: 8px;
`

function SingleArtist ({ artist }) {

    useEffect(() => {
        
    }, [artist])

    return (
        <>
            <ArtistStyle>
                <P>
                    <strong>
                        <i>{artist.artist.join(", ")}</i>
                    </strong>
                </P>
                <Link to={`/artist/${artist.slug.current}`}>
                    <H2>
                        <span className="mark">
                            <strong>{artist.name}</strong>
                        </span>
                    </H2>
                </Link>
                <Img fluid={artist.image.asset.fluid} alt={artist.name}/>
                <H6>
                    <strong>{artist.description.substr(0,100)+'...'}</strong>
                </H6>
            </ArtistStyle>
        </>
    )
}

export default function ArtistsList ({ artists }) {
    return (
        <Background>
            <H2Modified>Top Features</H2Modified>
            <ArtistGridStyles>
                {artists.map((artist) => {
                    return (
                        <SingleArtist key={artist.id} artist={artist} />
                    )
                })}
            </ArtistGridStyles>
        </Background>
    )
}