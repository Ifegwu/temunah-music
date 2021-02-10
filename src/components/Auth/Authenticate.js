import React, { useState, useEffect } from "react"
import { parse } from "query-string"
import { useLocation } from "@reach/router"
import Login from './Login'
import Register from './Register'
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar } from "@material-ui/core"

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
    const [openError, setOpenError] = useState(true)
    const [param, setParam] = useState(false)
    const classes = useStyles();

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

    return newUser ? (
        <div className={classes.container}>
            <Register setNewUser={setNewUser}/>
            {
                param.message && <Snackbar message={param.message} open={openError} autoHideDuration={6000} />
            }
        </div>
    ) : (
        <div className={classes.container}>
            <Login setNewUser={setNewUser}/>
            {
                param.message && <Snackbar message={param.message} open={openError} autoHideDuration={6000} />
            }
        </div>
    )
}

export default Authenticate;