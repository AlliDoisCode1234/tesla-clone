import React, { useState } from 'react';
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

function Header() {
    const [burgerStatus, setBurgerStatus] = useState(false)
    return (
        <Container>
            <a href="#">
                <img src="/images/logo.svg" />
            </a>
            <MenuGroup>
                <div>Model S</div>
                <div>Model 3</div>
                <div>Model X</div>
                <div>Model Y</div>
                <div>Solar Roof</div>
                <div>Solar Panels</div>
            </MenuGroup>
            <RightMenu>
                <a href="#">Shop</a>
                <a href="#">Account</a>
                <MenuIconContainer onClick={() => setBurgerStatus(true)}>
                    <div>Menu</div>
                </MenuIconContainer>
            </RightMenu>
            <BurgerNav status={burgerStatus}>
                <CloseContainer>
                    <Close onClick={() => setBurgerStatus(false)} />
                </CloseContainer>

                <li><a href="">Existing Inventory</a></li>
                <li><a href="">Used Inventory</a></li>
                <li><a href="">Trade-In</a></li>
                <li><a href="">Cybertruck</a></li>
                <li><a href="">Roadster</a></li>
                <li><a href="">Semi</a></li>
                <li><a href="">Charging</a></li>
                <li><a href="">Powerwall</a></li>
                <li><a href="">Commercial Energy</a></li>
                <li><a href="">Utilities</a></li>
                <li><a href="">Test Drive</a></li>
                <li><a href="">Find Us</a></li>
                <li><a href="">Support</a></li>


            </BurgerNav>
        </Container>
    )
}

export default Header

const Container = styled.div`
    display: flex;
    min-height: 60px;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;

`

const MenuGroup = styled.div`
    display: flex;
    text-transform: uppercase;
    font-size: .9em;
    font-weight: 400;
    div {
        
        padding: 0 15px;
        cursor: pointer;
    }

    @media(max-width: 768px) {
        display: none;
    }

`

const RightMenu = styled.div`
    display: flex;
    align-items: center;
    a {
        font-weight: 400;
        text-transform: uppercase;
        padding-right: 25px;
    }
`

const MenuIconContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    div {
        font-weight: 400;
        text-transform: uppercase;
    }
`

const CloseContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

const Close = styled(CloseIcon)`
    cursor: pointer;
`

const BurgerNav = styled.div`
    position: fixed;
    width: 300px;
    background: white;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 20px;
    list-style: none;
    transform: ${props => props.status ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.2s ease-in;
    li {
        padding: 15px 0;
        border-bottom: 1px solid rgba(0, 0, 0, .2);
        a {
            font-weight: 600;
        }
    }
`