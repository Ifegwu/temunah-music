import React, { useContext } from 'react'
import { PROFILE_QUERY } from '../../pages/profile'
import { Query } from 'react-apollo'
import { UserContext } from './Layout';
import { ThemeProvider } from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import theme from '../ThemeModified'
import Error from '../Error'
import Loading from '../Auth/Loading'
import { format } from 'date-fns'

const ProfileUser = ({ classes }) => {
    const currentUser = useContext(UserContext)
    return (
        <Query query={PROFILE_QUERY} variables={ currentUser }>
            {({ data, loading, error }) => {
              
              if (loading) return <Loading />
              if (error) return <Error error={error} />
              console.log(data.user.id)

              return (
                <div className={classes.root}>
                  <ThemeProvider theme={theme}>
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={<Avatar>{data.user.username[0]}</Avatar>}
                            title={data.user.username}
                            // subheader={`Joined ${format(data.user.dateJoined, 'MMM Do, YYYY')}`}
                            subheader={`Joined ${format(new Date(data.user.dateJoined), 'MMM dd, yyyy')}`}
                        />
                    </Card>
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