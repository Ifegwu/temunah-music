import React, { useContext, useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components';
import { Waypoint } from 'react-waypoint';
import { parse } from "query-string"
import { useLocation } from "@reach/router"
import { animated, useSpring, config } from 'react-spring';
import { UserContext } from './Layout';
import Banner from './Banner'
import PublicMusic from './PublicTrack/PublicMusic'
import { OutboundLink } from "gatsby-plugin-google-analytics"
import TwitterSocial from "./Newsletter/TwitterSocial"
import GitHubSocial from "./Newsletter/GithubSocial"
import { 
            Container, 
            deviceMin, 
            deviceMax, 
            H3, 
            P, 
            TagResourceContainer,
            Button
        } from "./Primitives"
import SEO from "../seo"
import ArtistsList from './ArtistsList';
import AdvertList from './Adverts';
import { useStaticQuery, graphql } from 'gatsby';
import Musician from './Musician';
import { Snackbar } from '@material-ui/core';
import theme from '../../styles/ThemeModified'
import bg from '../../assets/images/twistedlines.svg';

const OverlayedContainer = styled(Container)`
  padding: 20px 20px;
  max-width: none;
  background-image: url(${bg});
  /* background-color: #cccccc;  */
  height: 1; /* You must set a specified height */
  background-position: left; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  
  @media ${deviceMax.mobileL} {
    width: 100%;
    text-align: center;
  }
`
const PlayerContainer = styled(Container)`
  padding: 20px 20px;
  max-width: none;

  @media ${deviceMax.mobileL} {
    width: 100%;
    text-align: start;
  }
`
const Column = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: 2rem auto;
  max-width: 1440px;
  align-items: center;
`
const Card = styled.div`
  box-sizing: border-box;
  text-decoration: none;
  margin-bottom: 50px;
  padding: 0 20px;
  justify-content: space-between;

  img {
    height: 75%;
    width: 75%;
    align-items: center;
    align-self: center;
  }

  @media ${deviceMin.mobileS} {
    flex: 0 0 100%;
    max-width: 100%;
  }

  @media ${deviceMin.tablet} {
    flex: 0 0 100%;
    max-width: 100%;
  }

  @media ${deviceMin.laptop} {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
`

const FirstCard = styled(animated.div)`
  box-sizing: border-box;
  text-decoration: none;
  margin-bottom: 50px;
  padding: 0 20px;
  justify-content: space-between;
  img {
    height: 75%;
    width: 75%;
    align-items: center;
    align-self: center;
  }

  @media ${deviceMin.mobileS} {
    flex: 0 0 100%;
    max-width: 100%;
  }

  @media ${deviceMin.tablet} {
    flex: 0 0 100%;
    max-width: 100%;
  }

  @media ${deviceMin.laptop} {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
`

const TContainer = styled.div`
    margin-top: 10;
    margin-bottom: 10;  
    background-color: var(--grey);
    color: var(--text);
    border-radius: 10px;
    align-content: center;
    align-items: center;
`
const InnerContainer = styled.div`
    box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);
    padding: 10px 10px;
    padding-bottom: 12px;
    border-radius: 10px;
    line-height: 1.25;
    align-self: center;
    align-content: center;
    align-items: center;
`

const Social = styled.div`
    padding-top: 12px;
    align-items: center;
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
  }
`
const Section = styled.section`
    padding-bottom: 40px;
    padding-top: 40px;
`
const SocialAndContact = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  justify-content: center;
  padding-top: 8px;
  padding-bottom: 8px;
  font-weight: 400
`
const PromotionContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr 2fr;
  align-items: center;
  justify-items: center;
  justify-content: center;
  padding: 8px;
  font-weight: 400;
  padding-top: 8px;
  padding-bottom: 8px;
  transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  &:hover {
    transform: scale(1.1, 1.1);
  }
`
const PhoneAndEmail = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  justify-items: center;
  justify-content: center;
  padding: 8px;
  font-weight: 400;
  padding-top: 8px;
  padding-bottom: 8px;
  transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  &:hover {
    transform: scale(1.1, 1.1);
  }
`

const LandingComponent = () => {
    const [on, toggle] =  useState(false)
    const [hasScrolled, setHasScrolled] = useState(false)
    const [openError, setOpenError] = useState(true)
    const [param, setParam] = useState(false)
    
    const location = useLocation()

    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      if(scrollTop > 50) {
        setHasScrolled(!hasScrolled)
      } else {
        setHasScrolled(hasScrolled)
      }
    }

    const artists = useContext(UserContext)

    useEffect(() => {
      const searchParams = parse(location.search)
      setParam(searchParams)
      
      if(openError){
          setTimeout(() => {
          setOpenError(false)
        }, 6000)
      }	
      window.addEventListener('scroll',
        handleScroll
      )
    }, [setParam, setOpenError, artists])


    const animation = useSpring({
      opacity: on ? 1 : 0,
      transform: on ? 'translate3d(0,0,0)' : 'translate3d(-10%, 0, 0)',
      config: config.molasses
    });

    const { nodes } = AdvertQuery();
    const adverts = nodes;
    return(
      <>
          <SEO />
          <section>
              <Banner />
          </section>
          <Section>
              {
                param.message && 
                  <ThemeProvider theme={theme}>
                    <Snackbar message={param.message} open={openError} autoHideDuration={6000} />
                  </ThemeProvider>
              }
              <OverlayedContainer>
                  <Column>
                    <Waypoint 
                        bottomOffset = "30%"
                        onEnter={() => {
                            if(!on) toggle(true);
                        }}
                    />
                      <FirstCard style={animation}>
                          <TContainer>
                            <InnerContainer>
                                <PromotionContainer>
                                    <H3>
                                        @TemunahMusic
                                    </H3>
                                    <P>
                                        We help push your music to the main stream, and encourage
                                        upcoming Artists to be shine examples of Jesus Christ.
                                    </P>
                                    <Button to="/auth">
                                          Promote
                                    </Button>
                                </PromotionContainer>
                            </InnerContainer>
                          </TContainer>
                      </FirstCard>
                      <Card>
                          <TContainer>
                              <InnerContainer>
                                  <PhoneAndEmail>
                                      <P>
                                          <strong>Phone: </strong>
                                          +49 1521 9330 345
                                      </P>
                                      <P>
                                          <strong>Email: </strong>
                                          info@temunah.online
                                      </P>
                                  </PhoneAndEmail>
                                  <SocialAndContact>
                                        <Social>
                                            <OutboundLink href="https://github.com/Ifegwu/" target="_new">
                                                <GitHubSocial />
                                            </OutboundLink>
                                            <OutboundLink href="https://twitter.com/danielagbanyim" target="_new">
                                                <TwitterSocial />
                                            </OutboundLink>
                                        </Social>
                                      <Button to="/contact">
                                          Contact
                                      </Button>
                                  </SocialAndContact>
                              </InnerContainer>
                          </TContainer> 
                      </Card>
                      <Card >
                          <Musician />
                      </Card>
                  </Column>
              </OverlayedContainer>
          </Section>
          <Section>
            <PlayerContainer>
              <TagResourceContainer>
                <PublicMusic />
              </TagResourceContainer>
            </PlayerContainer>
          </Section>
          <Section>
              <OverlayedContainer>
                  <AdvertList adverts={adverts}/>
              </OverlayedContainer>
          </Section>
          <Section>
              <OverlayedContainer>
                  <ArtistsList artists={artists} />
              </OverlayedContainer>
          </Section>
      </>
  )
}

export const AdvertQuery = () => {
    const { musicAdverts } = useStaticQuery (
        graphql`
            query {
                musicAdverts:  allSanityAdvert {
                    nodes {
                        id
                        name
                        slug {
                            current
                        }
                        image {
                            asset {
                                fluid(maxWidth: 400) {
                                    ...GatsbySanityImageFluid
                            }
                        }
                    }
                        description
                    }
                  
                }
            }
        `
    )
    return musicAdverts
}
  

export default LandingComponent;



