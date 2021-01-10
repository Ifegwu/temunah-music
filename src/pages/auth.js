import React, { useState } from "react"
import { withStyles } from "@material-ui/styles"
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
import Layout from "../components/Frontend/Layout"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme  => ({
    container: {
        position: "relative",
        marginBottom: "45px",
        alignContent: "center",
        paddingTop: theme.spacing(7),
        width: "auto",
            display: "flex",
        [theme.breakpoints.up("md")]: {
                width: 600,
                marginLeft: "auto",
                marginRight: "auto"
            },
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
    }
}));

const Authenticate = () => {
    const [newUser, setNewUser] = useState(true)
    const classes = useStyles();
    return newUser ? (
        <Layout>
            <div className={classes.container}>
                <Register setNewUser={setNewUser}/>
            </div>
        </Layout>
    ) : (
        <Layout>
            <div className={classes.container}>
                <Login setNewUser={setNewUser}/>
            </div>
        </Layout>
    )
}

// const styles = theme => ({
//     root: {
//       paddingTop: theme.spacing(9),
//       width: "auto",
//           display: "flex",
//       [theme.breakpoints.up("md")]: {
//               width: 900,
//               marginLeft: "auto",
//               marginRight: "auto"
//           },
//       marginLeft: theme.spacing(1),
//       marginRight: theme.spacing(1),
//     },
//     text: {
//       paddingRight: theme.spacing(1),
//       MarginTop: theme.spacing(1),
//       MarginBottom: theme.spacing(1),
//       gridArea: 'form', 
//       position: 'relative',
//       paddingTop: theme.spacing(1),
//       paddingBottom: theme.spacing(1)
//     },
//     messasge: {
//       MarginTop: theme.spacing(3),
//       // gridArea: 'article', 
//       marginLeft: "auto",
//           marginRight: "auto",
//       padding: '0 1rem',
//       paddingTop: theme.spacing(3),
//       MarginBottom: theme.spacing(3),
//     }
//   })
  
//   export default withStyles(styles)(Authenticate);
export default Authenticate;