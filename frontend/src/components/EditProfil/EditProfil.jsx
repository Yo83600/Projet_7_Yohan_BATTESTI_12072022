import './EditProfil.css'
import React, {useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditProfil = () => {
    const [ Name,setName] = useState("");
    const [ Firstname,setFirstname] = useState("");
    const [ Email,setEmail] = useState("");
    const [ Picture,setPicture] = useState("");

    const userID = localStorage.getItem("user")
    useEffect ( () => {
    //Récupere les info de l'utilisateur connecté
    axios.get(`/api/auth/${userID}`,{
        headers:{
					'Authorization': "Bearer " + localStorage.getItem('token')
				}
        })
        .then(reponse => {
            setFirstname(reponse.data.firstname)
            setName(reponse.data.name)
            setEmail(reponse.data.email)
            setPicture(reponse.data.picture)
        }) 
        .catch( error => {
            console.log(error)
        })
    },[userID])

      const editSubmit = e => {
        e.preventDefault() 

        // data du user
        const data = new FormData();
        data.append("name", Name);
        data.append("firstname", Firstname);
        data.append("profil_image", Picture);
 
        //Modifier un user
        axios.put(`/api/auth/${userID}`, data, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token') 
        }
        })
        .then(reponse => {
          console.log(reponse.data);
          localStorage.setItem("name", Name)
          localStorage.setItem("firstname", Firstname)
          UpdateInfo()
        }) 
        .catch( error => {
          console.log(error)
        })
      }

    // information de modification du user
    const UpdateInfo = () => {
    Swal.fire({
    icon: 'success',
    title: 'Votre profil à été modifié',
    showConfirmButton: false,
    timer: 1500,
    }).then((result) => {
        if (result) {
      window.location = "/"}
    })
    }

    // affichage de la photo dans le input
    const loadFile = function(e) {
      var reader = new FileReader();
      reader.onload = function(){
        var output = document.querySelector("#input-photo-post");
        output.src = reader.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    };

    return (
        <div className="modal-profil">
            <div className="modal-profil-content">
					<h2> Modifier votre profil</h2>
					<form onSubmit={e => editSubmit(e)}>
            <div className='add-picture'>
            <img src={Picture} className="edit-picture" alt="profil" id="input-photo-post"/>
            <input className="input-post" type="file" name="profil_image"  onChange={(e) => {
                  setPicture(e.target.files[0])
                  loadFile(e)
            }}/>
            </div>
						<label htmlFor="name">Nom:</label>
						<input
							type="text"
							id="name-profil"
              value={Name}
              onChange={e => setName(e.target.value)}
							autoComplete="off" 
            />
            <label htmlFor="firstname">Prénom:</label>
						<input
							type="text"
							id="firstname-profil"
              value={Firstname}
              onChange={e => setFirstname(e.target.value)}
							autoComplete="off" 
              />
              <label htmlFor="email">Email:</label>
              <input
              type="email"
              id="email-profil"
              defaultValue={Email}
              disabled
              />
						<button id="save">Modifier</button>
					</form>
				</div>
		  </div>
    )
}
 
export default EditProfil