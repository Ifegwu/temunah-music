import React, { useState } from 'react'
import Layout from '../components/Frontend/Layout';
import { useTransition, animated, config } from 'react-spring'
import Img from 'gatsby-image'
import { StaticQuery, graphql } from 'gatsby'
import withStyles from "@material-ui/core/styles/withStyles"
import { Divider } from '@material-ui/core'
import MessageSuccess from '../components/MessageSuccess'
import ContactUs from '../components/Frontend/ContactUs'

const Contact = ({ classes }) => {
  
    const [messageSent, setMessageSent] = useState(false)

    const sentTransition = useTransition(messageSent, null, {
        from: {
            opacity: 0,
            transform: 'translate3d(0, 10rem, 0)',
        },
        enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        leave: { opacity: 0, transform: 'translate3d(0, 10rem, 0)' },
        config: config.stiff,
    })

  return (
    <Layout>
      <div className={classes.root}>
        {messageSent ? (
          sentTransition.map(
            ({ item, key, props }) =>
              item && (
                <animated.div style={props} key={key}>
                {/* <Img fluid={data.image.childImageSharp.fluid} /> */}
                  <div>Your Message is sent!</div>
                  <Divider />
                  <MessageSuccess />
                </animated.div>
              )
            )
         ) : (
            <ContactUs setMessageSent={setMessageSent} />
        )}
      </div>
    </Layout>
  )
}

// const contactQuery = graphql`
//   query contactQuery{
//     image: file(relativePath: {
//       regex: "/message/"
//     }) {
//       childImageSharp {
//         fluid(maxWidth: 300) {
//           ...GatsbyImageSharpFluid
//         }
//       }
//     }
//   }
// `

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(9),
    width: "auto",
		display: "flex",
    [theme.breakpoints.up("md")]: {
			width: 900,
			marginLeft: "auto",
			marginRight: "auto"
		},
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  text: {
    paddingRight: theme.spacing(1),
    MarginTop: theme.spacing(1),
    MarginBottom: theme.spacing(1),
    gridArea: 'form', 
    position: 'relative',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  messasge: {
    MarginTop: theme.spacing(3),
    // gridArea: 'article', 
    marginLeft: "auto",
		marginRight: "auto",
    padding: '0 1rem',
    paddingTop: theme.spacing(3),
    MarginBottom: theme.spacing(3),
  }
})


export default withStyles(styles)(Contact)

