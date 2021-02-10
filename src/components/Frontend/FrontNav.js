import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Logo from '../../assets/images/logo.svg'


const size = {
    mobileXS: '280px',
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    mobileB: '640',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

export const device = {
    mobileXS: `(min-width: ${size.mobileXS})`,
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    mobileB: `(min-width: ${size.mobileB})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`
};

const NavStyles = styled.nav`
    margin-bottom: 3rem;
    position: fixed;
    font-family: "Poppins", sans-serif;
    font-size: calc((0.002173913) * 100vw + (11.2173913043) * 1px);
    width: 100%;
    z-index: 100;
    transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
`

const NavGroup = styled.div`
    ul {
        max-width: 800;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(3, auto);
        grid-gap: 2rem;
        text-align: center;
        list-style: none;
        justify-items: center;
        align-items: center;
    }
    li {
        &:hover {
            --rotate: 3deg;
        }
        a {
            font-size: 20px;;
            text-decoration: none;
            color: var(--pink);
            font-weight: 700;
            &:hover {
                color: var(--redOverlay)
            }
        }
        button {
            padding: 8px 20px;
            font-size: 20px;
            border: none;
            font-weight: 700;
            border-radius: 10px;
            outline: none;
            cursor: pointer;
            transition: 1s;

        }
        button:hover {
            background: whitesmoke;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
            color: var(--pink);
            transform: translateY(-3px);
        }
    }
`

const LogoStyle = styled.img`
    align-self: flex-end;
    height: 5em;
    width: 5em;
    margin: 0 auto;
`

export default function FrontNav() {
    const [hasScrolled, setHasScrolled] = useState(false)

    const handleScroll = (event) => {
        const scrollTop = window.pageYOffset
        if(scrollTop > 50) {
            setHasScrolled(!hasScrolled)
        } else {
            setHasScrolled(hasScrolled)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    return (
        
        <NavStyles>
            <div className={hasScrolled ? "header-scroll" : ""}>
                <NavGroup>
                    <ul>
                        <li>
                            <Link to="/">
                                <LogoStyle src={Logo} />
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                        <li>
                            <Link to="/auth">
                                <button>Login</button>
                            </Link> 
                        </li>                   
                    </ul>
                </NavGroup>
            </div>
        </NavStyles>
    )
}
