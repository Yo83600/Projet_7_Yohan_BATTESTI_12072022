import React, { useState} from "react";
import axios from "axios";

import './Like.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
//import {useHistory} from 'react-router-dom';

//const POST_URL = `/api/posts/${postId.postId}/like`;
 
const Like = ({postId , likes, userId}) => {
   // let history = useHistory();
    const nbrLike = likes.length > 0 ? likes.length : 0;
    const [nbOfLikes, setNbOfLikes] = useState(nbrLike);
    const [postLiked, setPostLiked] = useState('');
    //console.log(postId)
    // console.log(postId.postId)
 
    const undleSubmit = e => {
        e.preventDefault() // evite le rechargement
 
        const data = {
        userLike : localStorage.getItem("user"),
        postId : postId
        };
        
        //console.log(data)
        //console.log("Bearer"+localStorage.getItem('token'))
        //Récupere tous les posts
        axios.post(`/api/posts/${postId}/like`,data, {
        headers: {
            'Authorization': "Bearer "+localStorage.getItem('token') 
        }
        })
        .then(reponse => {
            // setNbOfLikes('')
            // setPostLiked('')
            const {message} = reponse.data;
            if(message === "Post disliké"){
              let newNbrLike = nbOfLikes - 1;
              setNbOfLikes(newNbrLike)
              setPostLiked(false)
            }else{
              let newNbrLike = nbOfLikes + 1;
              setNbOfLikes(newNbrLike)
              setPostLiked(true)
            }
           console.log(reponse.data)
        
           //console.log(setNbOfLikes)
           //console.log(setPostLiked)
        }) 
        .catch( error => {
        })
    }

    return (
    <div className="to-interact">
      <div className="to-interact__nb-of-likes">
          <span className={postLiked ? "button__liked" : null} onClick={undleSubmit}>
            <FontAwesomeIcon
              icon={faThumbsUp}
              color={postLiked ? "#38618C" : "grey"}
            />
          </span>
        <p className="to-interact__nb-of-likes--number">{nbOfLikes}</p>
      </div>
      <div className="to-interact__buttons">
      </div>
    </div>
     )}
  ;


export default Like;