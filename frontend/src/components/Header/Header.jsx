import { Link } from 'react-router-dom';
import React, { useState} from "react";
import logo from '../../assets/icon-left-font.png';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

// structuration de la navbar
const Header = () => {
    return (
          <nav>
            <div className='nav-container'>
              <div className="logo">
                <Link to="/">
                <div className="logo">
                  <img src={logo} alt="groupomania" />
                </div>
                </Link>
              </div>
              <div className="welcome">
                <h3> Bonjour, {localStorage.getItem("firstname")} {localStorage.getItem("name")} 😀 </h3>
                <div className="profil">
                  <Link to="/profil">
                      <FontAwesomeIcon icon={faUser} />
                  </Link>
                </div>
                <button className="button-disconnect" onClick={()=> Disconnect() }>Déconnexion</button>
              </div>
            </div>
          </nav>
    )
}

// navbar si l'utilisateur n'est pas connecté
const Guest = () => {
    return (
        <nav>
         <Link to="/">
            <div className="logo">
              <img src={logo} alt="groupomania"/> 
            </div>
          </Link>
        </nav>
    )
}

// fct pour deconnecter l'utilisateur
const Disconnect = () => {
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

// si l'utilisateur est connecté la navbar header s'affiche sinon c'est la navbar guest qui s'affiche
const Navigation = () => {
  const isLoggedIn = localStorage.getItem('token');
  let [userLogged] = useState(isLoggedIn);
  if (userLogged) {
    return < Header/>;
  }
    return <Guest/>;
}

export default Navigation