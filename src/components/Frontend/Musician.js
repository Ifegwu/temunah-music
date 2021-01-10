import React, { useState } from 'react'
import { Waypoint } from 'react-waypoint';
import { animated, useSpring, config } from 'react-spring';
import Img from 'gatsby-image';
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components';

const Card = styled(animated.div)`
  box-sizing: border-box;
  text-decoration: none;
  margin-bottom: 50px;
  padding: 0 20px;
  justify-content: space-between;
`

const Musician = () => {
    const [on, toggle] =  useState(false)
    const animation = useSpring({
      opacity: on ? 1 : 0,
      transform: on ? 'translate3d(0,0,0)' : 'translate3d(10%, 0, 0)',
      config: config.molasses
    });
    return (
        <StaticQuery
            query={query}
            render={data => (
                <>
                    <Waypoint 
                            bottomOffset = "30%"
                            onEnter={() => {
                              if(!on) toggle(true);
                            }}
                    />
                    <Card style={animation}>
                        <>
                          {<Img fluid={data.image.childImageSharp.fluid} />}
                        </> 
                    </Card>
                </>

            )}
        />
    )
}

export const query = graphql`
  query {
    image: file(relativePath: {
      regex: "/headphone/"
    }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`


export default Musician