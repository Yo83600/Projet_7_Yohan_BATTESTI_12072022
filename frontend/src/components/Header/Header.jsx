import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../assets/icon-left-font.png'
import './Header.css'

const StyledLink = styled(Link)`
    padding: 15px;
    color: #8186a0;
    text-decoration: none;
    font-size: 18px;`
 
function Header() {
    return (
        <header>
            <StyledLink to="/">
                 <img id="logo" src={logo} alt="groupomania"/> 
            </StyledLink>
        <nav>
                <StyledLink to="/freelances">Profils</StyledLink>
        </nav>
        </header>
    )
}

export default Header