import React, { useState }from 'react'
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
import { ThemeProvider } from '@material-ui/core';
import theme from '../ThemeModified'


const SUBSCRIPTION_MUTATION = gql`
    mutation($username: String!, $email: String!, $music: String!) {
        createSubscription(username: $username, email: $email, music: $music) {
            user {
                username
                email
            }
        }
    }
`
const Transition = React.forwardRef((props, ref) => <Slide direction="up" {...props} ref={ref}/>)


const Subscription = ({ setNewUser, classes }) => {
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [music, setMusic] = useState("")
    const [open, setOpen] = useState(false)

	const handleSubmit = (event, createSubscription) => {
		event.preventDefault()
		createSubscription()
	} 

	return (
			<div className={classes.root}>
				<Paper className={classes.paper}>
					<ThemeProvider theme={theme}>
						<Avatar className={classes.avatar}>
							<Gavel />
						</Avatar>
						<Typography variant="inherit">Subscription</Typography>
						<Mutation mutation={SUBSCRIPTION_MUTATION}
							variables={{ username, email, music }}
							onCompleted={data => {
								// console.log({ data })
								setOpen(true)
							}}
						>
							{(createSubscription, {loading, error}) => {
								return (
										<form onSubmit={event =>handleSubmit(event, createSubscription)} className={classes.form}>
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
												<InputLabel htmlFor="password">Music name</InputLabel>
												<Input
													id="music"
													type="text"
													name="music"
													onChange={event => setMusic(event.target.value)}
												/>
											</FormControl>
										    <Button 
												color="primary"
												type="submit"
												fullWidth
												variant="contained"
												disabled={loading || !username.trim() || !email.trim() || !music.trim() ||!open.trim}
												className={classes.submit}
											>
												{loading ? "Subscribing..." : "Subscribe"}
											</Button>
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
						new subscription
					</DialogTitle>
					<DialogContent>
						<DialogContentText>Subscription succesfully created!</DialogContentText>
					</DialogContent>
					<DialogContent>
						<DialogContentText>You've subscribed.</DialogContentText>
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

export default withStyles(styles)(Subscription);