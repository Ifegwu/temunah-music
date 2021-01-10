import React, { useState } from 'react'
import { useTransition, animated, config } from 'react-spring'
import Img from 'gatsby-image'
import { StaticQuery, graphql } from 'gatsby'
import withStyles from "@material-ui/core/styles/withStyles"
import { Divider } from '@material-ui/core'
import ContactForm from '../components/ContactForm'
import MessageSuccess from '../components/MessageSuccess'
import Layout from '../components/Frontend/Layout'

// const CardBg = styled.div`
//     width: 300px;
//     height: 170px;
//     position: relative;
//     overflow: hidden;
//     border-radius: 15px;
//     box-shadow: 0 20px 40px rgba(0, 0, 0, 0, 0.25);
//     display: grid;
//     grid-template-rows: 1fr 1fr;
//     transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
//     padding-top: 6px;
// `

// const CardGroup = styled.div`
//     margin: 50px 40px 100px;
//     display: grid;
//     grid-template-columns: repeat(3, 1fr);
//     grid-gap: 40px;
//     justify-content: center;
//     justify-items: center;
// `

const contactQuery = graphql`
  query contactQuery{
    image: file(relativePath: {
      regex: "/message/"
    }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
// const H2 = styled.h2`
//     color: rgba(0, 0, 0, 0.8);
//     font-weight: 800;
//     transform-style: "uppercase";
// `

// const H4 = styled.h4``

// export function Card({children, ...props}) {
//     return <div className="Card">
//         <img src={props.image} />
//         <H2>{props.title}</H2>
//         <H4>{children}</H4>   
//     </div>
// }

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
            <StaticQuery
                query={contactQuery}
        
                render={data => (
                <div>
                    <div className={classes.root}>
                        {messageSent ? (
                        sentTransition.map(
                            ({ item, key, props }) =>
                            item && (
                                <animated.div style={props} key={key}>
                                <Img fluid={data.image.childImageSharp.fluid} />
                                <Divider />
                                <MessageSuccess />
                                </animated.div>
                            )
                        )
                        ) : (
                        <ContactForm setMessageSent={setMessageSent} />
                        )}
                    </div>
                    
                    {/* <CardBg>
                        <p className="">
                            Our Services
                        </p>
                        <CardGroup> 
                            {data.allMarkdownRemark.edges.map(({ node }) => (
                            <Card 
                                title={node.frontmatter.title}  
                                image={require('../assets/images/component2.png')} 
                                key={node.frontmatter.path}
                            >        
                                <div dangerouslySetInnerHTML={{ __html: node.html }}></div>
                            </Card>
                            ))}
                        </CardGroup>
                    </CardBg> */}
                </div> 
                )}
            />
      </Layout>
  )
}

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