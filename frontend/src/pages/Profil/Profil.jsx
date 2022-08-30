import React from "react";
import { Navigate } from "react-router-dom";
import EditProfil from "../../components/EditProfil/EditProfil";
import './Profil.css'

function Profil() {

    const token = localStorage.getItem('token');

    if(!token){
        return <Navigate to="/login"/>
    }
    return (
      <div className="profil">
        <EditProfil/>
    </div>
  )
}
 
export default Profil
  

