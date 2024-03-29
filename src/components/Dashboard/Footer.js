import React from "react"
import { Link } from "gatsby"
import { Container, deviceMin, deviceMax } from "../Frontend/Primitives"
import GitHubSocial from "../Frontend/Newsletter/GithubSocial"
import TwitterSocial from "../Frontend/Newsletter/TwitterSocial"
import NewsletterForm from "../Frontend/Newsletter/NewsletterFooter"
import styled from "styled-components"
import { OutboundLink } from "gatsby-plugin-google-analytics"

const Footer = () => {
  return (
    <FooterContainer>
      <Column>
        <Card>
          <H3>&copy; {new Date().getFullYear()}</H3>
          <Logo to="/app/dashboard">
            <H3>Temunah Music</H3>
          </Logo>
        </Card>
        <Card>
          <NewsletterForm />
        </Card>
        <Card>
          <H3>Follow Us</H3>
          <OutboundLink href="https://github.com/Earner-ai/" target="_new">
            <GitHubSocial />
          </OutboundLink>

          <OutboundLink href="https://twitter.com/earner_ai" target="_new">
            <TwitterSocial />
          </OutboundLink>
        </Card>
      </Column>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled(Container)`
  padding: 20px;
  background-color: var(--naturalDark);
  max-width: none;
  font-family: "Poppins", sans-serif;
  font-size: calc((0.002173913) * 100vw + (11.2173913043) * 1px);

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

  @media ${deviceMax.mobileL} {
    width: 100%;
    text-align: center;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: row;
  color: var(--naturalLight);
  flex-wrap: wrap;
  width: 100%;
  margin: 2rem auto;
  max-width: 1440px;
`
const Card = styled.div`
  box-sizing: border-box;
  text-decoration: none;
  color: var(--naturalLight);
  margin-bottom: 50px;
  padding: 0 20px;
  justify-content: space-between;

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
const Logo = styled(Link)`
  color: var(--text);
  text-transform: none;
  text-decoration: none;
`
const H3 = styled.h3`
  color: var(--naturalLight);
  text-decoration: none;
`