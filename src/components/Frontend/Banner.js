import React from 'react'
import Img from 'gatsby-image';
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import banner from '../../assets/images/hero.svg'
import Waves from './waves'
import ModelComponent from './ModalComponent'
import { device } from './FrontNav'


const bannerQuery = graphql`
  query bannerQuery{
    image: file(relativePath: {
      regex: "/gig/"
    }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
}
`

const Hero = styled.div`
    position: relative;
    background-image: url(${banner});
    background-color: #E3E8FF;
    height: 750px;
    background-size: cover;
    background-position: center;
`

const HeroGroup = styled.div`
    margin: 0 auto;
    max-width: 500px;
    padding: 250px 50px;
    text-align: center;
    display: flex;

    h1 {
        left: 0px;
        top: 0px;
        font-weight: bold;
        font-size: 50px;
        line-height: 60px;

        color: #FFFFFF;


        /* Inside Auto Layout */

        flex: none;
        order: 0;
        /* align-self: flex-start; */
        flex-grow: 0;
        margin: 0px 16px;
        opacity: 0;
        animation: HeroAnimation;
        animation-duration: 3s;
        animation-delay: 0.1s;
        animation-fill-mode: forwards;
        animation-timing-function: cubic-bezier(0.07, 0.8, 0.2, 1);

        padding: auto auto

    }
    h3 {
        margin: 0;
        /* padding-top: 4px; */
        color: white;
        font-size: 20px;
        line-height: 1.2;
        color: rgb(255,255,255, 0.8);
        animation: HeroAnimation 3s 0.2s forwards cubic-bezier(0.07, 0.8, 0.2, 1); 
        opacity: 0;
        padding-bottom: 8px;
        padding: auto auto
    }
    /* p {
        color: #FFFFFF;

        flex: none;
        order: 1;
        flex-grow: 0;
        margin: 0px 19.4933px;
        color: rgb(255,255,255, 0.8);
        font-size: 20px;
        line-height: 1.5;
        animation: HeroAnimation 3s 0.3s forwards cubic-bezier(0.07, 0.8, 0.2, 1);
        opacity: 0;
    } */

    @media ${device.mobileB} {
        h1 {
            font-size: 40px;
            padding: auto auto;
            padding-bottom: 8px;
        }
        p {
            font-size: 24px;
            padding: auto auto;
            padding-bottom: 8px;
        }
    }

    @keyframes HeroAnimation {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0px);
        }
    }
`
const Wave = styled.div`
    position: absolute;
    width: 100%;
    left: 0;
    bottom: -10px;
    transition: rotate(180deg);
`
const BannerContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr;
    align-content: center;
    justify-content: center;
    align-items: center;
    text-align: center;

    position: absolute;
`

const BannerContent = styled.div`
    display: grid;
    font-family: "Poppins", sans-serif;
    grid-template-rows: auto auto auto;
    align-items: center;
    text-align: center;
    justify-items: center;
`



export default function Banner() {
    return(
        <StaticQuery
            query={bannerQuery}
            render={data => (
                <Hero>
                        <HeroGroup>                   
                            <BannerContainer>
                                <BannerContent>
                                    <h1>Temunah Music</h1>
                                    <h3>Promoting Musical Talents</h3>
                                    <p>
                                       <ModelComponent>Watch Demo</ModelComponent>
                                    </p>
                                </BannerContent>
                                <Img fluid={data.image.childImageSharp.fluid} /> 
                            </BannerContainer>
                        </HeroGroup>
                        <Wave>
                            <Waves />
                        </Wave>
                    </Hero>
            )} 
        />
    )  
};