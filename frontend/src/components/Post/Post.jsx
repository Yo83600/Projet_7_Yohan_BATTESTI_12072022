import React, { useState } from "react";
import axios from "axios";
import './Post.css'
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
           console.log(reponse.data)
        }) 
        .catch( error => {
            setError(error.reponse.data.error)
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
                <button className="connexion-button">Créer le post !</button>
            </form>
        </div>
    );
}
 
export default Post;


// import PropTypes from 'prop-types'
// import styled from 'styled-components'

// const PostLabel = styled.span`color: #FD2D01;
//     font-size: 15px;
//     font-weight: bold;
//     padding-left: 15px;
// `

// const PostImage = styled.img`
//     height: 40px;
//     width: 40px;
//     border-radius: 50%;
// `

// const PostWrapper = styled.div`
//     margin: 20px;
//     padding : 20px;
//     background-color: #FFF;
//     border-radius: 30px;
//     width: 1000px;
//     transition: 200ms;
//     &:hover {
//         cursor: pointer;
//         box-shadow: 2px 2px 10px #e2e3e9;
//     }
// `
// const PostProfil = styled.div`
//     display:inline-flex;
//     align-items:center;
// `
// const PostDate = styled.div`
//     padding-left:800px;
// `
 
// function Card({ label, title, picture }) {
//     return (
//         <PostWrapper>
//             <PostProfil>
//             <PostImage src={picture} alt="freelance" /> 
//             <PostLabel>{label}</PostLabel>
//             <PostDate>Il y a 5 jours</PostDate></PostProfil>
//             <p>{title}</p>
//         </PostWrapper>
//     )
// }
 
// Card.propTypes = {
//     label: PropTypes.string,
//     title: PropTypes.string,
//     picture: PropTypes.string,
// }
 
// export default Card