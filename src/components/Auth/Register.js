import React, { useState, useEffect }from 'react'
import { parse } from "query-string"
import { useLocation } from "@reach/router"
// import { Input } from 'Common'
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Gavel from "@material-ui/icons/Gavel";
import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";
import Error from '../Error'
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from "@material-ui/core/Snackbar";
import { ThemeProvider } from '@material-ui/core';
// import Payment from '../Payment/payment';
import theme from '../ThemeModified'


const REGISTER_MUTATION = gql`
	mutation($username: String!, $email: String!, $password: String!) {
			createUser(username: $username, email: $email, password: $password) {
			user {
				username
				email
			}
		}
	}
`

const Transition = React.forwardRef((props, ref) => <Slide direction="up" {...props} ref={ref}/>)


const Register = ({ setNewUser, classes }) => {
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [open, setOpen] = useState(false)
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

	const handleSubmit = (event, createUser) => {
		event.preventDefault()
		createUser()
	} 

	return (
			<div className={classes.root}>
				{
				 	param.message && 
					<ThemeProvider theme={theme}>
						 <Snackbar message={param.message} open={openError} autoHideDuration={6000} />
					</ThemeProvider>
				}
				<Paper className={classes.paper}>
					<ThemeProvider theme={theme}>
						<Avatar className={classes.avatar}>
							<Gavel />
						</Avatar>
						<Typography variant="inherit">Register</Typography>
						<Mutation mutation={REGISTER_MUTATION}
							variables={{ username, email, password }}
							onCompleted={data => {
								setOpen(true)
							}}
						>
							{(createUser, {loading, error}) => {
								return (
										<form onSubmit={event =>handleSubmit(event, createUser)} className={classes.form}>
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
												<InputLabel htmlFor="email">Email</InputLabel>
												<Input
													id="email"
													type="email"
													name="email"
													onChange={event => setEmail(event.target.value)}
												/>
											</FormControl>
											<FormControl margin="normal" required fullWidth>
												<InputLabel htmlFor="password">Password</InputLabel>
												<Input
													id="password"
													type="password"
													name="password"
													onChange={event => setPassword(event.target.value)}
												/>
											</FormControl>
											{/* <Payment /> */}
											<div>
												<Button 
													color="primary"
													type="submit"
													fullWidth
													variant="contained"
													disabled={loading || !username.trim() || !email.trim() || !password.trim()}
													className={classes.submit}
													>
													{loading ? "Registering..." : "Register"}
												</Button>
											</div>
											<div>
												<Button 
													onClick={() => setNewUser(false)}
													color="primary"
													variant="outlined"
													fullWidth
													>
													Previous user? Login here
												</Button>
											</div>
											{/* Error Handling */}
											{error && <Error error={error}/>}

										</form>
								)
							}}
						</Mutation>

					</ThemeProvider>
				</Paper>


				{/* Success Dialog */}
				<Dialog
					open={open}
					disableBackdropClick={true}
					TransitionComponent={Transition}
				>
					<DialogTitle>
					<VerifiedUserTwoTone className={classes.icon} />
						new Account
					</DialogTitle>
					<DialogContent>
						<DialogContentText>User succesfully created!</DialogContentText>
					</DialogContent>
					<DialogContent>
						<DialogContentText>You've got an email, kindly verify your account.</DialogContentText>
					</DialogContent>
					<DialogContent>
						<Button
							onClick={() => setNewUser(false)}
							color="primary"
							
						>
							Login
						</Button>
					</DialogContent>
				</Dialog>
			</div>
	)
}

const styles = theme => ({
    root: {
		width: "auto",
		display: "flex",
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		marginBottom: theme.spacing(3),
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
		alignItems: "center",
		alignSelf: "center",
		justifySelf: "center",
		justifyContent: "center",
		backgroundColor: theme.palette.primary.main
	},
	form: {
		width: "100%",
		margin: theme.spacing(1),
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

export default withStyles(styles)(Register);