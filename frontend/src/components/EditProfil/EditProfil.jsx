import './EditProfil.css'
import React, {useState, useEffect } from "react";
import axios from "axios";
const Swal = require('sweetalert2')

const EditProfil = () => {
  // Fonction Delete au click
    const [ Name,setName] = useState("");
    const [ Username,setUsername] = useState("");
    const [ Email,setEmail] = useState("");
    //const RefMessage = useRef();
    const userID = localStorage.getItem("user")
    useEffect ( () => {
    //Récupere tous les posts
    axios.get(`/api/auth/${userID}`,{
        headers:{
					'Authorization': "Bearer " + localStorage.getItem('token')
				}
        })
        .then(reponse => {
			console.log(reponse.data)
			console.log(reponse.data.username)
            setUsername(reponse.data.username)
            setName(reponse.data.name)
            setEmail(reponse.data.email)
        }) 
        .catch( error => {
            console.log(error)
        })
    },[userID])

      const undleSubmit = e => {
        e.preventDefault() // evite le rechargement
 
        //Creer un post
        axios.put(`/api/auth/${userID}`,{ name : Name, username : Username}, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token') 
        }
        })
        .then(reponse => {
          console.log(reponse.data);
          localStorage.setItem("name", Name)
          UpdateInfo()
        }) 
        .catch( error => {
        })
    }

    const UpdateInfo = () => {
    Swal.fire({
    icon: 'success',
    title: 'Votre profil à été modifié',
    showConfirmButton: false,
    timer: 1500,
    }).then((result) => {
        if (result) {
      window.location.reload()}
    })
    }

    return (
           <div className="modal-profil">
            <a href='/' id="back-welcome">⬅ Retour</a>
                <div className="modal-profil-content">
					<h2> Modifier votre profil</h2>
					<form onSubmit={e => undleSubmit(e)}>
						<label htmlFor="name">Name:</label>
						<input
							type="text"
							id="name"
                            value={Name}
                            onChange={e => setName(e.target.value)}
							autoComplete="off" 
                        />
                        <label htmlFor="username">Username:</label>
						<input
							type="text"
							id="username"
                            value={Username}
                            onChange={e => setUsername(e.target.value)}
							autoComplete="off" 
                        />
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
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