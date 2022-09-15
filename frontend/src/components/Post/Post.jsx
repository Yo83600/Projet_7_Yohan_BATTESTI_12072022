import React, { useState,useEffect } from "react";
import axios from "axios";
import './Post.css'
import Swal from 'sweetalert2';

const POST_URL = '/api/posts/';
 
const Post = ({token}) => {
    const [message, setMessage] = useState("")
    const [image, setImage] = useState()
    const [picture, setPicture] = useState("")
    const [error, setError] = useState("")
 
    const postSubmit = e => {
        e.preventDefault() // evite le rechargement
        
        // data du post
        const data = new FormData();
        data.append('image', image);
        data.append('message', message);
 
        //Creer un post
        axios.post(POST_URL,data, {
        body: data,
        headers: {
            'Authorization': `Bearer ${token}` 
        }
        })
        .then(reponse => {
           PostInfo()
           console.log(reponse.data)
        }) 
        .catch( error => {
            setError(error.reponse.data.error)
        })
    }

    // variable pour recuperer le userId dans le localstorage
    const userID = localStorage.getItem("user");

    // récupération du userId pour savoir si c'est un admin
    useEffect(() => {
        //Récupere le userId
        axios.get(`/api/auth/${userID}`, {
            headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((reponse) => {
            setPicture(reponse.data.picture);
        })
        .catch((error) => {
            console.log(error)
        });
    }, [userID]);
    
    // popup qui affiche un message pour l'utilisateur
    const PostInfo = () => {
    Swal.fire({
    icon: 'success',
    title: 'Votre publication à été ajouté',
    showConfirmButton: false,
    timer: 1500,
    }).then((result) => {
        if (result) {
      window.location.reload()}
    })
    }

    // affichage de la photo dans le input
    const loadFile = function(e) {
        var reader = new FileReader();
        reader.onload = function(){
        var output = document.querySelector(".output");
        output.src = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    };
 
    return(
        <div className="post">
            <form onSubmit={e => postSubmit(e)} className="App-post">
                <div className="App-loading-form">
                    <div>
                    <img src={picture} className="picture-profil" alt="profil" />
                    </div>
                    <div>
                        <textarea 
                            className="input-form-comment" 
                            placeholder="Quoi de neuf ?" 
                            width="200" 
                            maxLength="250" 
                            type="text" 
                            id="comment" 
                            name="comment" 
                            value={message} 
                            onChange={e => setMessage(e.target.value)} 
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="image">Image : </label>
                        <div className="custom-file-upload">
                            <input 
                                className="input-form" 
                                type="file" 
                                id="image" 
                                name="image" 
                                onChange={e => {
                                    setImage(e.target.files[0])
                                    loadFile(e)
                                }}
                                onDrop = {e => loadFile(e)}
                            />
                        </div>
                        {image &&  <img className="output" alt=""/>}
                    </div>
                </div>
                <div className="error">{error}</div>
                <button className="create-button">Créer le post !</button>
            </form>
        </div>
    );
}
 
export default Post;
