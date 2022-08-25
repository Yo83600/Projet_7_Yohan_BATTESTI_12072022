import React from "react";
import './Profil.css'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


function Profil() {
    return (
      <div className="profil">
        <a href="/profil">
        <FontAwesomeIcon
          icon={faUser}
        /></a>
    </div>
  )
}
 
export default Profil
  

