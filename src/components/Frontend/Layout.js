import React, { useState, useEffect } from 'react';
import { Router, useLocation } from '@reach/router'
import { parse } from "query-string"
import { graphql, useStaticQuery, withPrefix } from "gatsby";
import styled from 'styled-components';
import { Snackbar } from '@material-ui/core';
import 'normalize.css';
import FrontNav from './FrontNav';
import Footer from './Footer';
import GlobalStyles from '../../styles/GlobalStyles';
import Typography from '../../styles/Typography';
import Loading from '../Auth/Loading'
import LandingComponent from './LandingComponent';

const ContactMe = React.lazy(() => import('../../pages/contactme'))

export const UserContext = React.createContext()


const ContentStyles = styled.div`
  background: white;
  /* padding: 2rem; */
`;

// const LazyComponent = ({ Component, ...props }) => (
//     <React.Suspense fallback={<Loading />}>
//       <Component {...props} />
//     </React.Suspense>
// );

const Layout = ({ children, props }) => {
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
	}, [setParam, setOpenError])


  const { nodes } = HomeQuery();
  const artists = nodes;

  return (
    <UserContext.Provider value={artists} {...props}>
      <GlobalStyles />
      <Typography />
        <ContentStyles>
          <FrontNav />
          <Router basepath={withPrefix("/")} >
            <LandingComponent path="/" />
            {/* <LazyComponent Component={ContactMe} path="/contact" /> */}
            {/* <ContactMe path="/contact" /> */}
          </Router>
          {
            param.message && <Snackbar message={param.message} open={openError} autoHideDuration={6000} />
          }
          {children}
          <Footer />
        </ContentStyles>
      {/* </SiteBorderStyles> */}
    </UserContext.Provider >
  );
}

export const HomeQuery = () => {
  const { musicArtists } = useStaticQuery (
      graphql`
          query($skip: Int = 0, $pageSize: Int = 4) {
              musicArtists: allSanityMusic(limit: $pageSize, skip: $skip) {
                  totalCount
                  nodes {
                      name
                      id
                      slug {
                          current
                      }
                      description
                      artist
                      person {
                          facebook
                          instagram
                          twitter
                          name
                      }
                      albums {
                          name
                        }
                      image {
                          asset {
                              fixed(width: 200, height: 200) {
                                  ...GatsbySanityImageFixed
                              },
                              fluid(maxWidth: 400) {
                                  ...GatsbySanityImageFluid
                              }
                          }
                      }
                  }
              }
            }
      `
  )
  return musicArtists
}


export default Layout;