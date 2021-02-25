import React from 'react';
import Layout from '../components/Frontend/Layout';
import SEO from '../components/seo';

const IndexPage = ({ children }) => {

  return (
    <Layout>
      <>
        <SEO />
        {children}
      </>
    </Layout>
  )
}

export default IndexPage;

