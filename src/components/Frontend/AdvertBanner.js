import React from 'react'
import Img from 'gatsby-image';
import { graphql, StaticQuery, navigate } from 'gatsby'
import styled from 'styled-components';

import { H1, H4, P } from '../Frontend/Primitives';
import { device } from '../Frontend/FrontNav'

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const Card = styled.div`
  box-sizing: border-box;
  text-decoration: none;
  margin-bottom: 50px;
  padding: 0 20px;
  justify-content: space-between;
`

const Background = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  Background-color: #FCCDD2;
  padding: 4px 4px;
  justify-content: center;
  align-item: center;
  align-content: center;

  @media ${device.mobileM} {
    h1 {
        font-size: 32px;
    }
    h4 {
        font-size: 18px;
    }
  
    @media ${device.desktop} {
      h1 {
          font-size: 64px;
      }
      h4 {
          font-size: 42px;
      }
      @media ${device.laptopL} {
        h1 {
            font-size: 60px;
        }
        h4 {
            font-size: 30px;
      }

  @media ${device.laptop} {
    h1 {
        font-size: 60px;
    }
    h4 {
        font-size: 30px;
  }

  @media ${device.tablet} {
    h1 {
        font-size: 40px;
    }
    h4 {
        font-size: 28px;
    }

  @media ${device.mobileS} {
    h1 {
        font-size: 20px;
    }
    h4 {
        font-size: 12px;
    }
}
`

const Premium = styled(H1)`
  font-weight: 700;
  padding-right: 4px; 
`
const H4Modified = styled(H4)`
  font-weight: 400; 
  padding-right: 4px;
`

export default function AdvertBanner() {
    return (
        <StaticQuery
            query={query}
            render={data => (
              <>
                <Card>
                  <div>{<Img fluid={data.image.childImageSharp.fluid} />}</div> 
                  <Background>
                    <Premium>Get 3 months of Premium for free</Premium>
                    <H4Modified>Enjoy endless ad-free music.</H4Modified>
                    <P>
                      <Button primary onClick={() => navigate("/auth")}>GET PREMIUM</Button>
                      <Button>LEARN MORE</Button>
                    </P>
                  </Background>
                </Card>
              </>

            )}
        />
    )
}

export const query = graphql`
  query {
    image: file(relativePath: {
      regex: "/advert/"
    }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`