import React, { useContext, useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components';
import { Waypoint } from 'react-waypoint';
import { parse } from "query-string"
import { useLocation } from "@reach/router"
import { animated, useSpring, config } from 'react-spring';
import { UserContext } from '../components/Frontend/Layout';
import Banner from '../components/Frontend/Banner'
import PublicMusic from '../components/Frontend/PublicTrack/PublicMusic'
import { OutboundLink } from "gatsby-plugin-google-analytics"
import TwitterSocial from "../components/Frontend/Newsletter/TwitterSocial"
import GitHubSocial from "../components/Frontend/Newsletter/GithubSocial"
import { 
            Container, 
            deviceMin, 
            deviceMax, 
            H3, 
            P, 
            TagResourceContainer,
            Button
        } from "../components/Frontend/Primitives"
import SEO from "../components/seo"
import ArtistsList from '../components/Frontend/ArtistsList';
import AdvertList from '../components/Frontend/Adverts';
import { useStaticQuery, graphql } from 'gatsby';
import Musician from '../components/Frontend/Musician';
import { Snackbar } from '@material-ui/core';
import theme from '../components/ThemeModified'

const OverlayedContainer = styled(Container)`
  padding: 20px 20px;
  max-width: none;

  @media ${deviceMax.mobileL} {
    width: 100%;
    text-align: center;
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
  padding-button: 8px;
  font-weight: 400
`
const PromotionContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr 2fr;
  align-items: center;
  justify-items: center;
  justify-content: center;
  padding: 8px;
  font-weight: 400
  padding-top: 8px;
  padding-button: 8px;
  transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  &:hover {
    transform: scale(1.1, 1.1);
  }
`
const PhoneAndEmail = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr
  align-items: center;
  justify-items: center;
  justify-content: center;
  padding: 8px;
  font-weight: 400
  padding-top: 8px;
  padding-button: 8px;
  transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  &:hover {
    transform: scale(1.1, 1.1);
  }
`

const ArtistLanding = () => {
    const [on, toggle] =  useState(false)
    const [hasScrolled, setHasScrolled] = useState(false)
    const [openError, setOpenError] = useState(true)
    const [param, setParam] = useState(false)
    
    const location = useLocation()
	
    useEffect(() => {
      const searchParams = parse(location.search)
      setParam(searchParams)
      // console.log(searchParams.message)
      
      if(openError){
          setTimeout(() => {
          setOpenError(false)
        }, 6000)
      }	
      window.addEventListener('scroll',
        handleScroll
      )
    }, [setParam, setOpenError])

    const handleScroll = (event) => {
      const scrollTop = window.pageYOffset
      if(scrollTop > 50) {
        setHasScrolled(!hasScrolled)
      } else {
        setHasScrolled(hasScrolled)
      }
    }

    const artists = useContext(UserContext)

    const animation = useSpring({
      opacity: on ? 1 : 0,
      transform: on ? 'translate3d(0,0,0)' : 'translate3d(-10%, 0, 0)',
      config: config.molasses
    });

    const { nodes } = AdvertQuery();
    const adverts = nodes;
    return(
      <>
          <SEO title="Home" />
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
                                          +234 81 652 125 74
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
              <OverlayedContainer>
                    <TagResourceContainer>
                        <PublicMusic />
                    </TagResourceContainer>
              </OverlayedContainer>
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
  

export default ArtistLanding


