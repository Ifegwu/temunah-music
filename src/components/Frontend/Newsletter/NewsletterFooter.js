import React, { useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import styled from "styled-components"
// import { Icon } from "./Icons"
import { SubmitBtn, Input, deviceMax } from "../Primitives"

const NewsLetterForm = () => {
  const [email, setEmail] = useState(null)
  const [allow, setAllow] = useState(true)

  const _handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    addToMailchimp(email)
      .then(({ msg, result }) => {
        if (result !== "success") {
          throw msg
        }
        setAllow(false)
        alert(msg)
      })
      .catch((err) => {
        console.log("err", err)

        alert(err)
      })
  }

  return (
    <NewsWrap>
      <LeftNews>
        <H3>Let&apos;s keep in touch!</H3>
        <P>Subscribe to our newsletter & stay up to date with our services.</P>
        {allow ? (
          <EmailForm method="POST" onSubmit={handleSubmit}>
            <Input
              type="email"
              onChange={_handleChange}
              placeholder="your@email.com"
              name="email"
              className="newsletterInput"
            />
            <SubmitBtn
              title="Subscribe to our newsletter"
              name="Subscribe"
              type="submit"
              style={{ margin: "auto", marginTop: "30px" }}
            >
              Subscribe
            </SubmitBtn>
          </EmailForm>
        ) : (
          <ThanksForSubscribing>Thanks for subscribing!</ThanksForSubscribing>
        )}
      </LeftNews>
    </NewsWrap>
  )
}

export default NewsLetterForm

const NewsWrap = styled.div`
  display: block;
  position: relative;

  @media ${deviceMax.mobileL} {
    margin: 0px auto;
  }
`
const LeftNews = styled.div`
  margin: 0 auto;
`

const H3 = styled.h3``

const P = styled.p``

const EmailForm = styled.form`
    align-content: center;
`

const ThanksForSubscribing = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-weight: 700;
`