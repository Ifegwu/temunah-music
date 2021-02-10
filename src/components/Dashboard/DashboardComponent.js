import React, { useContext, useState } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { UserContext } from './Layout';
import withStyles from '@material-ui/core/styles/withStyles'
import { Divider, ThemeProvider } from '@material-ui/core'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import  SearchTracks from './PrivateTrack/SearchTracks'
import  TrackList from './PrivateTrack/TrackList'
import  CreateTrack from './PrivateTrack/CreateTrack'
import Updateuser from './UpdateUser';
import Loading from '../Auth/Loading'
import Error from '../Error'
import theme from '../../styles/ThemeModified'
import styled from 'styled-components';
import Wrapper from '../Wrapper';
import ProfileUser from './ProfileUser';

const Card = styled.div`
    display: flex;
    gap: 5rem;
    align-items: center;
    justify-content: center;
    justify-items: center;
    justify-self: center;
    padding: 8px;
    box-shadow: 0 15px 35px rgba(50,50,93,0.1), 0 5px 15px rgba(0,0,0,.07);
    padding: 4rem 4rem;
    `
const StripeContainer = styled.div`
    display: flex;
    flex-direction: column;
    grid-template-columns: 2fr 2fr 2fr;
    position: relative;
    padding: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
    font-family: "Poppins", sans-serif;
    /* max-width: 300px; */
    h1 {
        font-weight: 800;
        font-size: 30px;
    }
    h2 {
        padding-top: 4px;
        padding-bottom: 4px;
        font-size: 30px;
        font-weight: 800;
    }
    h3 {
        padding-top: 4px;
        padding-bottom: 4px;
        display: grid;
        grid-template-columns: auto auto auto;
        font-size: 14px;
        font-weight: 600;
        padding: 4px 4px;
    }
`
const StripeCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 30px;
    
    position: relative;
    max-width: 300px;
    max-height: 309px;
    /* left: 287px; */
    /* top: 2468px; */

    background-color: var(--grayPro);
    /* Drop shadow */

    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.05), 0px 20px 40px rgba(0, 0, 0, 0.15);
    border-radius: 30px;
`

const StripeAritcleOne = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px 4px;
    padding-bottom: 8px;

    /* Inside Auto Layout */
    h4 {
        padding-top: 4px;
        padding-bottom: 4px;
        display: grid;
        font-size: 14px;
        font-weight: 600;
        padding: 4px 4px;
        text-decoration: line-through;
    }

    flex: none;
    order: 0;
    align-self: center;
    justify-content: center;
    flex-grow: 0;
    margin: 0px 30px;
`

const StripeAritcleTwo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px 4px;
    margin: 4px;
    gap: 25px;
    position: static;


    /* Inside Auto Layout */

    flex: none;
    align-self: center;
    order: 0;
    flex-grow: 0;
    margin: 0px 8px;
`

const StripeBooking = styled.div`
    position: static;
    width: 32px;
    height: 32px;
    left: 0px;
    top: 0px;

    /* Inside Auto Layout */

    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 10px 0px;
`

const CardContent = styled.div`
    display: grid;
    grid-template-rows: 2fr 2fr;
    padding: 4px 4px;
    align-items: center;
    justify-content: center;
    justify-items: center;
    justify-self: center;
    h1 {
        font-weight: 800;
        font-size: 30px;
    }
    h2 {
        padding-top: 4px;
        padding-bottom: 4px;
        font-size: 30px;
        font-weight: 800;
    }
    h3 {
        padding-top: 4px;
        padding-bottom: 4px;
        display: grid;
        grid-template-columns: auto auto auto;
        font-size: 14px;
        font-weight: 600;
        padding: 4px 4px;
    }
    p {
        padding-top: 4px;
        padding-bottom: 4px;
        font-size: 14px;
        font-weight: 800;
        align-items: center;
        align-self: center;
        justify-content: center;
    }
`

export const GET_TRACKS_QUERY = gql`
    query getTracksQuery {
        tracks(first: 10, skip: 1) {
            id
            title
            description
            url,
            avarta,
            likes {
                id
            }
            postedBy {
                id
                username
            }
        }
    }
    `;

const DashboardComponent = ({ classes }) => {
    const [searchResults, setSearchResults] = useState([])
    const currentUser = useContext(UserContext)
    return (
        <div className={classes.container}>
                <Query query={GET_TRACKS_QUERY} variables={ currentUser}>
                    {({ data, loading, error }) => {
                        if (loading) return <Loading />;
                        if (error) return <Error error={error} />
                        
                        const tracks = searchResults.length > 0 ? searchResults : data.tracks
                        return (
                            <ThemeProvider theme={theme}>
                                <ProfileUser />
                                <SearchTracks setSearchResults={setSearchResults}/>
                                <CreateTrack />
                                <TrackList tracks={tracks} />
                                <div>
                                        <Card>
                                            <StripeContainer>
                                                <StripeCard>
                                                    <StripeAritcleOne>
                                                        <h2>Subscription</h2>
                                                        <h4>N</h4><h1>5000/</h1>
                                                        <h3>Billed Monthly</h3>
                                                    </StripeAritcleOne>
                                                    <Divider className={classes.divider} />
                                                    <StripeAritcleTwo>
                                                        <StripeBooking>
                                                            <AccountBalanceWalletIcon
                                                                style={{ fontSize: 40 }}
                                                                color="primary"
                                                            />
                                                        </StripeBooking>
                                                        <h3>
                                                            This is a recurrent subscription plan. You can conviniently cancel plan at any time.
                                                        </h3>
                                                    </StripeAritcleTwo>
                                                    <Divider className={classes.divider} />
                                                    <Wrapper />
                                                </StripeCard>
                                            </StripeContainer>
                                        </Card>
                                        <Card>
                                            <CardContent>
                                                <h3>Settings</h3>
                                                    <Updateuser />
                                            </CardContent>
                                        </Card>
                                </div>
                        </ThemeProvider>
                    )}}
                </Query>
            </div>
    )
}


const styles = theme => ({
    container: {
        margin: "0 auto",
        maxWidth: "960",
        padding: theme.spacing(1),
        paddingTop: theme.spacing(18)
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
})

export default withStyles(styles)(DashboardComponent)

