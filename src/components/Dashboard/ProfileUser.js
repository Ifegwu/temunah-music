import React, { useContext, useEffect } from 'react'
import { PROFILE_QUERY } from './Profile'
import { Query } from 'react-apollo'
import { UserContext } from './Layout';
import { ThemeProvider } from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import theme from '../../styles/ThemeModified'
import Error from '../Error'
import Loading from '../Auth/Loading'
import { format } from 'date-fns'
import { Link } from 'gatsby'
import styled from 'styled-components';

const CardContainer = styled(Card)`
  display: flex;
  grid-template-columns: auto auto auto;
  align-items: center;
  align-self: center;
  justify-content: center;
  font-weight: 800;
  font-size: 18px;
`
const StripeButton = styled(Link)`
    /* Auto Layout */
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 10px 10px;
    text-decoration: none;
    font-weight: 800;

    position: relative;
    width: 90px;
    height: 25px;
    left: 15px;

    background: #00CFFD;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
    border-radius: 7px;

    &:hover {
        background-color: #5469d4;
        color: white;
    }
    align-items: center;
    align-content: center;
    justify-content: center;

    /* Inside Auto Layout */

    flex: none;
    order: 2;
    /* align-self: flex-start; */
    flex-grow: 0;
    margin: 0px 30px;
`
const ProfileUser = ({ classes }) => {
  
  const currentUser = useContext(UserContext)

    return (
        <Query query={PROFILE_QUERY} variables={ currentUser }>
            {({ data, loading, error }) => {
              
              if (loading) return <Loading />
              if (error) return <Error error={error} />

              return (
                <div className={classes.root}>
                  <ThemeProvider theme={theme}>
                    <CardContainer>
                        <StripeButton to={'/app/profile'}>
                          Profile
                        </StripeButton>
                        <CardHeader
                            avatar={<Avatar>{data.user.username[0].toUpperCase()}</Avatar>}
                            title={data.user.username}
                            // subheader={`Joined ${format(data.user.dateJoined, 'MMM Do, YYYY')}`}
                            subheader={`Joined ${format(new Date(data.user.dateJoined), 'MMM dd, yyyy')}`}
                        />
                    </CardContainer>
                  </ThemeProvider>
                </div>
              )
            }}
        </Query>
        
    )
}

const styles = theme => ({
    root: {
      paddingTop: theme.spacing(3)
    }, 
    card: {
      display: "flex",
      justifyContent: "center",
    },
    title: {
      display: "flex",
      alignItems: "center",
      marginBottom: theme.spacing(2)
    }
  });
  
export default withStyles(styles)(ProfileUser);