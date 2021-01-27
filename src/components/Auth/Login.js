import React, { useState }from 'react'

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Lock from "@material-ui/icons/Lock"
import Error from '../Error'
import withStyles from "@material-ui/core/styles/withStyles";
import { navigate, Link } from 'gatsby';
import { ThemeProvider } from '@material-ui/core';
import theme from '../ThemeModified'
import styled from 'styled-components'
import { createCookie } from '../../utils/client';

const StyledLink = styled(Link)`
	text-decoration: none;
	color: indigo;
	font-size: 20px;
`


export const API_URL ='http://localhost:8000'

const Login = ({ classes, setNewUser }) => {
    const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

    const handleSubmit = async (event, loginUser, client, element) => {
		event.preventDefault()
		const res = await loginUser()
		// localStorage.setItem('authToken', res.data.loginUser.token)
		createCookie('authToken', res.data.loginUser.token, 30);

		if (res.data.loginUser.token === null) {
			// return localStorage.removeItem('authToken');
			return createCookie('authToken', '', -1);
		} else {
			client.writeData({ data: { isLoggedIn: true } })
		}
		navigate("/music")
	}
	
	
    return (
        <div className={classes.root}>
			<Paper className={classes.paper}>
				<ThemeProvider theme={theme}>
					<Avatar  className={classes.avatar}>
						<Lock />
					</Avatar >
					<Typography color="textPrimary" variant='h5'>
						Login as Existing User
					</Typography>

					<Mutation mutation={LOGIN_MUTATION}
						variables={{ username, password }}
						onCompleted={data => {
							// console.log({ data })
						}}
					>
						{(loginUser, {loading, error, called, client}) => {
							return (
								<form onSubmit={event =>{
									handleSubmit(event, loginUser, client, error)
									}} 
									className={classes.form}
								>
									<FormControl margin="normal" required fullWidth>
										<InputLabel htmlFor="username">Username</InputLabel>
										<Input
											id="username"
											type="text"
											name="username"
											onChange={event => setUsername(event.target.value)}
										/>
									</FormControl>
									<FormControl margin="normal" required fullWidth>
										<InputLabel htmlFor="username">Password</InputLabel>
										<Input
											aria-label="password"
											id="password"
											type="password"
											name="password"
											onChange={event => setPassword(event.target.value)}
										/>
									</FormControl>
									<div>
										<Button 
											color="primary"
											type="submit"
											variant="contained"
											fullWidth
											disabled={loading || !username.trim() || !password.trim()}
											className={classes.submit}
										>
											{loading ? "Logging in..." : "Login"}
										</Button>
									</div>
									<div>
										<Button 
											onClick={() => setNewUser(true)}
											color="secondary"
											variant="outlined"
											fullWidth
											className={classes.submit}
										>
											New User? Register here.
										</Button>
									</div>
									{/* Error Handling */}
									{error && <Error error={error}/>}
								</form>
							)
						}}
					</Mutation>
						<Typography color="textPrimary" variant='h6'>
							
							{/* <ForgotPassword /> */}
							{/* <PasswordReset /> */}
							<StyledLink to={`${API_URL}/password-reset`}>Forgot password</StyledLink>
						</Typography>
				</ThemeProvider>
			</Paper>
		</div>
    )
}

const LOGIN_MUTATION = gql`
	mutation ($username: String!, $password: String!) {
		loginUser(username: $username, password: $password) {
			token
			message
		}
	}
`

// const AUTHTOKEN_MUTATION = gql`
// 	mutation($username: String!, $password: String!) {
// 		tokenAuth(username: $username, password: $password) {
// 			token
// 			refreshToken
// 		}
// 	}
// `

const styles = theme => ({
    root: {
		width: "auto",
		display: "flex",
		// marginLeft: theme.spacing(3),
		// marginRight: theme.spacing(3),
		// marginBottom: theme.spacing(3),
		[theme.breakpoints.up("md")]: {
			width: 400,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
		marginTop: theme.spacing(8),
		paddingTop: theme.spacing(9),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: theme.spacing(2)
	},
	title: {
		marginTop: theme.spacing(2),
		color: theme.palette.secondary.main
	},
	avatar:{
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main
	},
	form: {
		width: "100%",
		margin: theme.spacing(),
	},
	submit: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	icon: {
		padding: "0px 2px 2px 0px",
		verticalAlign: "middle",
	  }
})

export default withStyles(styles)(Login);