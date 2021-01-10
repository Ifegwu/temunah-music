import React, { useState, useEffect } from 'react';
import { Router, useLocation } from '@reach/router'
import { parse } from "query-string"
import { graphql, useStaticQuery } from "gatsby";
import styled from 'styled-components';
import { Snackbar } from '@material-ui/core';
import 'normalize.css';
import FrontNav from './FrontNav';
import Footer from './Footer';
import GlobalStyles from '../../styles/GlobalStyles';
import Typography from '../../styles/Typography';
import ArtistLanding from '../../pages/artists-landing';
// import IndexPage from '../../pages';

export const UserContext = React.createContext()


const ContentStyles = styled.div`
  background: white;
  /* padding: 2rem; */
`;

// const Authenticate = React.lazy(() => import('../../pages/auth'))
// const Contact = React.lazy(() => import('../../pages/contact'))
// const ArtistsPage = React.lazy(() => import('../../pages/artists'))

// const LazyComponent = ({ Component, ...props }) => (
//     <React.Suspense fallback={'<p>Loading...</p>'}>
//       <Component {...props} />
//     </React.Suspense>
// );

const Layout = ({ children, props, pageContext }) => {
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


  const { nodes, totalCount } = HomeQuery();
  // console.log(totalCount)
  const artists = nodes;

  return (
    <UserContext.Provider value={artists} {...props}>
      <GlobalStyles />
      <Typography />
        <ContentStyles>
          <FrontNav />
          <Router>
            <ArtistLanding path="/" />
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