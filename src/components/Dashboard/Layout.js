import React from 'react'
import { Query } from 'react-apollo'
import { gql } from "apollo-boost"
import { Router, Link } from '@reach/router'
import styled from 'styled-components'
import 'normalize.css'
import GlobalStyles from '../../styles/GlobalStyles'
import Typo from '../../styles/Typography'
import Loading from '../Auth/Loading';
import Error from '../Error';
// import Music from '../../pages/music';
import DashboardNav from './DashboardNav'
import Footer from './Footer'
import Logo from '../../assets/images/logo.svg'
import Signout from '../Auth/Signout'
import {ApolloConsumer}  from 'react-apollo'
import { createCookie } from '../../utils/client'
import Avatar from '@material-ui/core/Avatar';

const Profile = React.lazy(() => import('../../pages/profile'))
const Music = React.lazy(() => import('../../pages/music'))

export const UserContext = React.createContext()

const ContentStyle = styled.div`
    background: white;
`

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    mobileB: '640',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

export const device = {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`
};

const NavStyles = styled.nav`
    margin-bottom: 3rem;
    position: fixed;
    font-family: "Poppins", sans-serif;
    font-size: calc((0.002173913) * 100vw + (11.2173913043) * 1px);
    width: 100%;
    z-index: 100;
    /* background: rgba(0, 0, 0,0.8); */
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.05), 0px 20px 40px rgba(0, 0, 0, 0.15);
    padding: 5px 0;
`

const NavGroup = styled.div`
    ul {
        max-width: 800;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(3, auto);
        grid-gap: 2rem;
        text-align: center;
        list-style: none;
        justify-items: center;
        align-items: center;
    }
    li {
        /* --rotate: -2deg; */
        /* transform: rotate(var(--rotate));
        order: 1; */
        /* &:nth-child(1) {
            --rotate: 2.5deg;
        }
        &:nth-child(2) {
            --rotate: 1deg;
        }
        &:nth-child(3) {
            --rotate: -2.5deg;
        } */
        &:hover {
            --rotate: 3deg;
        }
        a {
            font-size: 20px;;
            text-decoration: none;
            color: var(--pink);
            font-weight: 700;
            &:hover {
                color: var(--pink)
            }
        }
        button {
            padding: 8px 20px;
            font-size: 20px;
            border: none;
            font-weight: 700;
            border-radius: 10px;
            outline: none;
            cursor: pointer;
            transition: 1s;

        }
        button:hover {
            background: whitesmoke;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
            color: var(--pink);
            transform: translateY(-3px);
        }
    }
`

const LogoStyle = styled.img`
    align-self: flex-end;
    height: 5em;
    width: 5em;
    margin: 0 auto;
`


const LazyComponent = ({ Component, ...props }) => (
    <React.Suspense fallback={'<p>Loading...</p>'}>
      <Component {...props} />
    </React.Suspense>
);

export default function Layout({ children, props }) {
    return (
        <Query query={ME_QUERY} fetchPolicy={"cache-and-network"}>
            {({ data, loading, error}) => {
                if (loading) return <Loading />
                if (error) {
                    sessionStorage.removeItem('authToken') 
                    createCookie('authToken', '', -1) 
                    return (error && <ApolloConsumer>
                                {client => <Error error={error} client={client} currentUser={currentUser} /> }
                            </ApolloConsumer>)
                }

                const currentUser = data.me
                return (
                    <UserContext.Provider value={currentUser}>
                        {error && <ApolloConsumer>
                            {client => <Error error={error} client={client} currentUser={currentUser} /> }
                        </ApolloConsumer>}
                        <div>
                            <GlobalStyles />
                            <Typo />
                            <ContentStyle>
                                <DashboardNav {...props}>
                                    <NavStyles>
                                        <NavGroup>
                                            <ul>
                                                <li>
                                                    <Link to="/music">
                                                        <LogoStyle src={Logo} />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/profile">
                                                        <Avatar style={{ backgroundColor: 'var(--pink)' }}>
                                                            {currentUser.username[0].toUpperCase()}
                                                        </Avatar>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button>
                                                        <Signout />
                                                    </button>
                                                </li>                   
                                            </ul>
                                        </NavGroup>
                                    </NavStyles>
                                </DashboardNav>
                                <Router>
                                    {/* <Music path="/music" /> */}
                                    <LazyComponent Component={Music} path="music" />
                                    <LazyComponent Component={Profile} path="profile" />
                                </Router>
                                <Footer />
                            </ContentStyle>
                        </div>

                    </UserContext.Provider>
                )
            }}
        </Query>
    )
}

export const ME_QUERY = gql`
    {
        me {
          id
          username
          email
          likeSet {
            track {
              id
            }
          }
        }
    }
` 