import React from "react"
import SEO from "../components/seo"
import Image from '../components/Frontend/image'
import styled from "styled-components"
import Layout from '../components/Frontend/Layout'

const ContentStyle = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: auto auto;
  padding-top: 150px;
  font-family: "Poppins", sans-serif;
  h1 {
    align-items: center;
    justify-content: center;
    padding: auto auto;
  }
`

const NotFoundPage = () => (
  <Layout>
    <ContentStyle>
      <SEO title="404: Not found" />
      <h1>404: Not Found</h1>
      <Image />
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </ContentStyle>
  </Layout>
)

export default NotFoundPage
