import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled  from 'styled-components'
import { H2 } from './Primitives';

const Background = styled.div`
    background-color: var(--naturalLight);
    padding: 4px 4px;
`

const AdvertGridStyles = styled.div`
    // position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 4rem;
    grid-auto-rows: auto auto 500px;
`;

const AdvertStyle = styled.div`
    display: grid;
    display: inline-table;
    a {
        text-decoration: none;
    }
    @supports not (grid-template-rows: subgrid) {
        --rows: auto auto 1fr;
    }
    grid-template-rows: var(--rows, subgrid);
    grid-row: span 2;
    grid-gap: 1rem;
    transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    h2 {
        transform: rotate(-2deg);
        background: var(--naturalLight);
        text-align: center;
        margin-bottom: -2rem;
        position: relative;
        z-index: 2;
        font-family: "Poppins", sans-serif;
        line-height: 14px;
    }
    .description {
        background: var(--naturalLight);
        font-family: "Poppins", sans-serif;
        // line-height: 14px;
        padding: 1rem;
        margin: 2rem;
        margin-top: -6rem;
        position: relative;
        transform: rotate(1def)
    }
    &:hover {
        transform: scale(1.1, 1.1);
    }
`;

const H2Modified = styled(H2)`
    align-items: center;
    justify-items: center;
    padding-bottom: 8px;
`

function SingleAdvert ({ advert }) {
    return (
        <AdvertStyle>
            <Link to={`/advert/${advert.slug.current}`}>
                <h2>
                    <span className="mark">
                        <strong>{advert.name}</strong>
                    </span>
                </h2>
            </Link>
            <Img fluid={advert.image.asset.fluid} alt={advert.name}/>
            <p className="description">
                {advert.description}
            </p>
        </AdvertStyle>
    )
}

export default function AdvertsList ({ adverts }) {
    return (
        <Background>
            <H2Modified>Services</H2Modified>
            <AdvertGridStyles>
                {adverts.map((advert) => {
                    return (
                            <SingleAdvert key={advert.id} advert={advert} />
                            )
                        })}
            </AdvertGridStyles>
        </Background>
    )
}