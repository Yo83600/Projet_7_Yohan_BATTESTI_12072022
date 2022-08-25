import { Link } from 'react-router-dom'
import React, { useState} from "react";
import styled from 'styled-components'
import logo from '../../assets/icon-left-font.png'
import './Header.css'
import Profil from '../../pages/Profil/Profil';
const Swal = require('sweetalert2')

const StyledLink = styled(Link)`
    padding: 15px;
    color: #8186a0;
    text-decoration: none;
    font-size: 18px;`
 
function Header() {
    return (
         <nav>
            <div className='nav-container'>
                <div className="logo">
          <StyledLink to="/">
            <div className="logo">
              <img src={logo} alt="groupomania"/> 
            </div>
          </StyledLink>
        </div>
            <div className="welcome">
               <h3> Bonjour &nbsp;
                {localStorage.getItem("name")} 😀 </h3>
                <Profil/>
            <button className="button-disconnect" onClick={() => Disconnect() }>Déconnexion</button>
               </div>
            </div>
        </nav>
    )
}

function Guest() {
    return (
        <nav>
         <StyledLink to="/">
            <div className="logo">
              <img src={logo} alt="groupomania"/> 
            </div>
          </StyledLink>
        </nav>
    )
}

function Disconnect() {
  Swal.fire({
    title: 'Êtes-vous sûr(e) ?',
    text: "Une fois déconnecté(e), vous ne pourrez plus créer de post.",
    icon: 'warning',
    showDenyButton: true,
    denyButtonText: 'Rester connecté',
    confirmButtonColor: '#d33',
    denyButtonColor: '#3085d6',
    confirmButtonText: 'Me déconnecter'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deconnecté(e)'
      )
      localStorage.clear()
      window.location.reload()
    }
  })
}

function Navigation() {
  const isLoggedIn = localStorage.getItem('token');
  let [userLogged] = useState(isLoggedIn);
  if (userLogged) {
    return < Header/>;
  }
    return <Guest/>;
}

export default Navigation