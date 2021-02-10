import styled from "styled-components"
import { Link } from "gatsby"

const size = {
  mobileXS: "280px",
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px"
}

export const deviceMin = {
  mobileXS: `(min-width: ${size.mobileXS})`,
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
}

export const deviceMax = {
  mobileXS: `(max-width: ${size.mobileXS})`,
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`
}

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding: 0rem 1rem;
  box-sizing: border-box;

  @media ${size.mobileS} {
    padding: 0rem 1rem;
  }

  @media ${size.mobileM} {
    padding: 0rem 1rem;
  }

  @media ${size.mobileL} {
    padding: 0rem 2rem;
  }

  @media ${size.tablet} {
    padding: 0rem 3rem;
  }

  @media ${size.laptop} {
  }

  @media ${size.laptopL} {
  }
`

export const ContentContainer = styled.div`
  max-width: 50rem;
  line-height: 1.5rem;
`

export const HabitContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0rem -1rem;
  flex-wrap: wrap;
  @media ${size.mobileM} {
  }

  @media ${size.mobileL} {
  }

  @media ${size.tablet} {
  }

  @media ${size.laptop} {
  }

  @media ${size.laptopL} {
  }
`

export const H1 = styled.h1`
  font-size: 55px;
  line-height: 65px;
  font-family: "Poppins", sans-serif;
  font-weight: 700;

  @media (max-width: 991px) {
    font-size: 40px;
    line-height: 48px;
  }
`

export const H2 = styled.h2`
  font-size: 38px;
  line-height: 55px;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  text-transform: none;

  @media (max-width: 991px) {
    font-size: 32px;
    line-height: 36px;
  }
`

export const H3 = styled.div`
  font-size: 28px;
  line-height: 40px;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  padding-bottom: 4px;

  @media (max-width: 991px) {
    font-size: 28px;
    line-height: 30px;
  }
  @media (max-width: 640px) {
    font-size: 18px;
    line-height: 14px;
  }
`

export const H4 = styled.div`
  font-size: 24px;
  line-height: 30px;
  font-family: "Poppins", sans-serif;

  @media (max-width: 991px) {
    font-size: 24px;
    line-height: 30px;
  }
`

export const H5 = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-family: "Poppins", sans-serif;

  @media (max-width: 991px) {
    font-size: 20px;
    line-height: 28px;
  }
`
export const H6 = styled.div`
  font-size: 14px;
  line-height: 24px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: "Poppins", sans-serif;

  @media (max-width: 991px) {
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`
export const P = styled.div`
  font-weight: 400;
  font-size: 17px;
  line-height: 30px;
  margin-bottom: 0px;
  color: var(--darkGrey);
`
export const Small = styled.div`
  font-size: 14px;
  letter-spacing: 0;
  line-height: 22px;
  font-family: "Poppins", sans-serif;
  text-transform: initial;
`

export const UL = styled.ul`
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  text-decoration: none;
`

export const LI = styled.li`
  margin: 15px;
  list-style-type: none;
`

export const Button = styled(Link)`
  background: var(--darkBlue);
  border-color: var(--darkBlue);
  color: white;
  padding: 8px 20px;
  border-radius: 24px;
  transition: all 0.25s linear;
  text-decoration: none;
  box-shadow: var(--boxShadow);

  &:hover {
    box-shadow: var(--boxShadowHover);
    transform: scale(1.01);
    color: #fff;
  }
`
export const SubmitBtn = styled.button`
  background: var(--primary);
  border-color: var(--darkBlue);
  color: white;
  padding: 8px 20px;
  border-radius: 24px;
  transition: all 0.25s linear!;
  text-decoration: none!;
  box-shadow: var(--boxShadow);

  &:hover {
    box-shadow: var(--boxShadowHover);
    transform: scale(1.01);
    color: #fff;
  }
`
export const GreenButton = styled(Link)`
  background: var(--green);
  border-color: var(--green);
  color: white;
  padding: 12px 24px;
  border-radius: 24px;
  transition: all 0.25s linear;
  text-decoration: none;
  box-shadow: var(--boxShadow);
  font-size: 16px;

  &:hover {
    box-shadow: var(--boxShadowHover);
    transform: scale(1.01);
    color: #fff;
  }
  @media ${deviceMax.mobileL} {
    margin-left: 27%;
  }
`
export const TagResource = styled.div`
  position: relative;
  display: block;
  border-radius: 24px;
  /* width: max-content; */
  padding: 20px 20px;
  /* margin-right: 30px; */
  box-shadow: var(--boxShadow);
  transition: all 0.25s linear;
  background-color: var(--grey);
`
export const TagResourceContainer = styled.div`
  display: block;
  border-radius: 24px;
  /* width: max-content; */
  padding: 2px 2px;
  /* margin-right: 30px; */
  box-shadow: var(--boxShadow);
  transition: all 0.25s linear;
  background-color: var(--secondary2);
`

export const TagContainer = styled.div`
  margin: 10px 0px;
`

export const TagBlog = styled.span`
  background-color: var(--grey);
  padding: 0.2rem 0.5rem;
  border-radius: 24px;
  color: var(--darkGrey);
  font-family: "Poppins", sans-serif;
  font-size: 10px;
  text-transform: uppercase;
`

export const Resources = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: 2rem auto;
  max-width: 1440px;

  @media ${deviceMax.mobileL} {
    h2 {
      text-align: center;
    }

    p {
      text-align: justify;
    }
  }
`
export const SeeMore = styled(Link)`
  display: block;
  border-radius: 24px;
  width: max-content;
  padding: 12px 20px 8px 20px;
  margin: auto;
  box-shadow: var(--boxShadow);
  transition: all 0.25s linear;

  &:hover {
    border-color: black;
    box-shadow: var(--boxShadowHover);
    transform: var(--transform);
  }
`
export const DarkButton = styled(Button)`
  margin: 30px auto;
`
export const Input = styled.input`
    font-size: 2rem;
    padding: 1.2rem;
    width: 100%;
    box-shadow: rgb(213, 210, 208) 5px 5px 15px inset, rgb(255, 255, 255) -5px -5px 15px inset;
    border-radius: 24px;
    border: none;
    overflow: visible;

  &:focus {
    outline: none;
    }
`