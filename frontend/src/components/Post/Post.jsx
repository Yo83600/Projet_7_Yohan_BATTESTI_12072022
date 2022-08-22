import React, { useState } from "react";
import axios from "axios";
import './Post.css'
const Swal = require('sweetalert2')
//import {useHistory} from 'react-router-dom';

const POST_URL = '/api/posts/';
 
const Post = ({token}) => {
   // let history = useHistory();
    const [message, setMessage] = useState("")
    const [image, setImage] = useState()
    const [error, setError] = useState("")
 
    const undleSubmit = e => {
        e.preventDefault() // evite le rechargement
 
        const data = new FormData();
        data.append('image', image);
        data.append('message', message);
 
        //Récupere tous les posts
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

    function PostInfo() {
    Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Votre publication à été ajouté',
    showConfirmButton: false,
    timer: 1500,
    }).then((result) => {
        if (result) {
      window.location.reload()}
    })
    }
 
    return(
        <div className="post">
            <form onSubmit={e => undleSubmit(e)} className="App-post">
                <h3>Poster un message :</h3>
                <div className="App-loading-form">
                    <div>
                        <input className="input-form-comment" placeholder="Inscrivez votre texte" width="200" maxLength="250" type="text" id="comment" name="comment" value={message} onChange={e => setMessage(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="image">Image : </label>
                        <br></br>
                        <input className="input-form" type="file" id="image" name="image" onChange={e => setImage(e.target.files[0])}/>
                    </div>
                </div>
                <div className="error">{error}</div>
                <button className="create-button">Créer le post !</button>
            </form>
        </div>
    );
}
 
export default Post;
