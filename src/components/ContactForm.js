import React, { useState } from 'react'
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import contactus from '../assets/images/contactus.gif';
import styled from 'styled-components';
import { Container } from '../components/Frontend/Primitives'
import { ThemeProvider } from '@material-ui/core';
import theme from '../components/ThemeModified'

// const Field = styled.div`
//   margin: 0 auto;le
//   label {
//     display: block;
//     font-size: 1rem;
//     font-weight: 700;
//     margin-bottom: 0.5em;
//   }
//   input,
//   textarea {
//     outline: none;
//     padding: 0 2rem;
//     border: 1px solid
//       ${({ length, valid }) =>
//         length === 0 ? '#dbdbdb' : valid ? 'rgb(60, 179, 113)' : '#a94442'};
//     border-radius: 3px;
//     font-size: 1rem;
//     height: 2.25em;
//     line-height: 1.5;
//     padding: calc(0.375em - 1px) calc(0.625em - 1px);
//     background-color: whitesmoke;
//     color: #363636;
//     box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
//     :focus,
//     :active {
//       outline: none;
//       box-shadow: inset 0 1px 5px
//         ${({ length, valid }) =>
//           length === 0
//             ? 'rgba(10, 10, 10, 0.1)'
//             : valid
//             ? 'rgba(60, 179, 113, 0.5)'
//             : 'rgba(169, 68, 66, 0.5)'};
//     }
//     width: 100%;
//   }
//   textarea {
//     max-height: 600px;
//     min-height: 120px;
//   }
// `

// const BtnField = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   @media (max-width: 780px) {
//     justify-content: space-around;
//   }
// `

const ContactImage = styled.div`
  /* mb-2 w-32 h-32 py-8 self-center */
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


const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const CheckValid = (...fields) =>
  fields.every(({ text, regex }) => regex.test(text))

// Component
const ContactForm = ({ setMessageSent, classes }) => {
  const [name, setName] = useState({
    text: '',
    valid: "false",
    regex: /\S/,
  })
  const [email, setEmail] = useState({
    text: '',
    valid: "false",
    // eslint-disable-next-line
    regex: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
  })
  const [message, setMessage] = useState({
    text: '',
    valid: "false",
    regex: /\S/,
  })

  const handleSubmit = e => {
    if (CheckValid(name, email, message)) {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'contact',
          name: name.text,
          email: email.text,
          message: message.text,
        }),
      })
        .then(res => {
          if (res.ok) {
            clearForm()
            setMessageSent(true)
          } else {
            throw Error(
              `Something went wrong and your message was not sent! 🤯 ${
                res.status
              } ${res.message}`
            )
          }
        })
        .catch(error => alert(error))
    }
    e.preventDefault()
  }

  const clearForm = () => {
    setName({ ...name, text: '' })
    setEmail({ ...email, text: '' })
    setMessage({ ...message, text: '' })
  }

  const handleChange = (state, set) => ({ target: { value } }) => {
    state.regex.test(value)
      ? set({ ...state, valid: "true", text: value })
      : set({ ...state, valid: "false", text: value })
  }

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

              <form
                  onSubmit={handleSubmit}
                  data-netlify="true"
                  name="contact"
                  method="post"
              >
                <Input type="hidden" name="form-name" value="contact" />
                <FormControl 
                  margin="normal" 
                  required 
                  fullWidth 
                  valid={name.valid} 
                  length={name.text.length}
                >
                    {/* <InputLabel htmlFor="name">Your Name: </InputLabel> */}
                    <Input
                      className={classes.textarea}
                      type="text"
                      name="name"
                      value={name.text}
                      placeholder="Your Name"
                      onChange={handleChange(name, setName)}
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth valid={email.valid} length={email.text.length}>
                    {/* <InputLabel htmlFor="email">Your Email: </InputLabel> */}
                    <Input
                      className={classes.textarea}
                      type="email"
                      name="email"
                      value={email.text}
                      placeholder="you@youremail.com"
                      onChange={handleChange(email, setEmail)}
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth valid={message.valid} length={message.text.length}>
                    {/* <InputLabel htmlFor="message">Message:</InputLabel> */}
                    <TextareaAutosize
                        className={classes.textarea}
                        name="message"
                        value={message.text}
                        onChange={handleChange(message, setMessage)}
                        rowsMax={10}
                        aria-label="maximum height"
                        placeholder="Your Message Here"
                    />
                </FormControl>
                <div>
                    <Button 
                        className={classes.button}
                        color="primary"
                        type="submit"
                        variant="contained"
                        disabled={!CheckValid(name, email, message)}
                    >
                        Send Message
                    </Button>
                    <Button 
                        className={classes.button}
                        color="secondary"
                        variant="contained"
                        onClick={clearForm}
                    >
                        Clear Form
                    </Button>
                </div>
              </form>
            </ThemeProvider>
        </Paper>
    </div>
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


export default withStyles(styles)(ContactForm)