import React, { useState } from "react"
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

export default Authenticate;