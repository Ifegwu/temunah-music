import React, { useState } from 'react'
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import contactus from '../../assets/images/contactus.gif';
import styled from 'styled-components';
import { Container } from './Primitives'
import { FormHelperText, ThemeProvider } from '@material-ui/core';
import theme from '../../styles/ThemeModified'
import { Mutation } from 'react-apollo';
import isEmail from 'isemail'
import Error from '../Error'
import { gql } from 'apollo-boost';


const ContactImage = styled.div`
  height: 150px;
  width: 150px;
  align-items: center;
`

const PlaceCard = styled(Container)`
  box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);
  border-radius: 5px;
  align-content: center;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const CheckValid = (...field) => {
  const errors = {};
  if (!field.name) errors.name = 'Name Required';
  if (!field.message) errors.message = 'Name Required';
  if (!field.email) errors.email = 'Email Required';
  if (field.email && !isEmail(field.email)) errors.email = 'Invalid Email';
  return errors;
};

// Component
const ContactUs = ({ setMessageSent, classes }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [fileError, setFileError] = useState("")
  const [submitting, setSubmitting] = useState(false)


  const handleSubmit = (e, contactForm) => {
    e.preventDefault()
    if (CheckValid(name, email, message)) {
        contactForm({
            variables: ({
                name,
                email,
                body: message
            })
        })
        .then(res => {
          if (res.ok) {
            // clearForm()
            clearForm()
            setSubmitting(true)
            setMessageSent(true)
          } else {
            setFileError(`Invalid or empty input`)
            setSubmitting(false)
            throw Error(
              `Something went wrong and your message was not sent! 🤯 ${
                res.status
              } ${res.message}`
            )
          }
        })
        .catch(error => alert(error))
    }
  }

  const clearForm = () => {
    setName("")
    setEmail("")
    setMessage("")
  }
  
  return (
    <Mutation mutation={CONTACT_FORM_QUERY}>
        {(contactForm, {loading, error}) => {
            return (
              <div className={classes.root}>
                  <Paper className={classes.paper}>
                      <ContactImage>
                          <img src={contactus} alt="contactus" />
                      </ContactImage>
                      <PlaceCard>
                          <p>
                              <strong>Phone:</strong> +49-1521-9330-345
                          </p>
                          <p>
                              <strong>Email: </strong>info@temunah.online
                          </p>
                      </PlaceCard>
                      <ThemeProvider theme={theme}>

                      <form onSubmit={ event => handleSubmit(event, contactForm)}>
                          <Input type="hidden" name="form-name" value="contact" />
                          <FormControl 
                            margin="normal" 
                            required 
                            fullWidth 
                            valid={name.valid} 
                            length={name.length}
                          >
                              {/* <InputLabel htmlFor="name">Your Name: </InputLabel> */}
                              <Input
                                className={classes.textarea}
                                type="text"
                                name="name"
                                value={name}
                                placeholder="Your Name"
                                required 
                                onChange={event => setName(event.target.value)}
                                inputProps={
                                  {maxLength: 60}
                                }
                              />
                          </FormControl>
                          <FormControl margin="normal" required fullWidth>
                              {/* <InputLabel htmlFor="email">Your Email: </InputLabel> */}
                              <Input
                                className={classes.textarea}
                                type="email"
                                name="email"
                                value={email}
                                placeholder="you@youremail.com"
                                required 
                                onChange={event => setEmail(event.target.value)}
                                inputProps={
                                  {maxLength: 50}
                                }
                              />
                              <FormHelperText>{fileError}</FormHelperText>
                          </FormControl>
                          <FormControl margin="normal" required fullWidth>
                              {/* <InputLabel htmlFor="message">Message:</InputLabel> */}
                              <TextareaAutosize
                                  className={classes.textarea}
                                  name="message"
                                  value={message}
                                  onChange={event => setMessage(event.target.value)}
                                  rowsMax={10}
                                  required 
                                  aria-label="maximum height"
                                  placeholder="Your Message Here"
                                  maxLength="200"
                              />
                              <FormHelperText>{fileError}</FormHelperText>
                          </FormControl>
                          <div>
                              <Button 
                                  className={classes.button}
                                  color="primary"
                                  type="submit"
                                  variant="contained"
                                  disabled={submitting ||!email.trim() ||!name.trim() || !message.trim()}
                              >
                                  Send
                              </Button>
                              <Button 
                                  className={classes.button}
                                  color="secondary"
                                  variant="contained"
                                  onClick={clearForm}
                              >
                                  Clear
                              </Button>
                          </div>
                      </form>
                      </ThemeProvider>
                  </Paper>
              </div>
            )
        }}
    </Mutation>
  )
}

const styles = theme => ({
    root: {
		width: "auto",
		display: "flex",
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		[theme.breakpoints.up("md")]: {
			width: 600,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
    marginTop: theme.spacing(8),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	title: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
		color: theme.palette.secondary.main
	},
	form: {
    width: "100%",
    marginLeft: theme.spacing(2),
		margin: theme.spacing(2) 
	},
	textarea: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
		marginBottom: theme.spacing(2)
    },
    button: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
		    marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        borderRadius: 10,
        border: 0,
        color: 'white',
        height: 30,
        padding: '0 20px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
})


export default withStyles(styles)(ContactUs)

export const CONTACT_FORM_QUERY = gql`
    mutation($name: String!, $email: String!, $body: String!) {
        contactForm(name: $name, email: $email, body: $body){
            name,
            email,
            body,
        }
    }
`