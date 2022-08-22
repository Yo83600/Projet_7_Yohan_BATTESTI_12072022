import React, { useState} from "react";
import axios from "axios";

  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
   import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
//import {useHistory} from 'react-router-dom';

//const POST_URL = `/api/posts/${postId.postId}/like`;
 
const Like = (postId) => {
   // let history = useHistory();
    const [nbOfLikes, setNbOfLikes] = useState(0);
    const [postLiked, setPostLiked] = useState(false);
    console.log(postId.postId)
 
    const undleSubmit = e => {
        e.preventDefault() // evite le rechargement
 
        const data = {
        postId : postId.postId
        };
        
        console.log(data)
        //console.log("Bearer"+localStorage.getItem('token'))
        //Récupere tous les posts
        axios.post(`/api/posts/${postId.postId}/like`,data, {
        headers: {
            'Authorization': "Bearer "+localStorage.getItem('token') 
        }
        })
        .then(reponse => {
            setNbOfLikes('')
            setPostLiked('')
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
        <FontAwesomeIcon icon={faThumbsUp} color={"#38618c"} />
        <p className="to-interact__nb-of-likes--number">{nbOfLikes}</p>
      </div>
      <hr />
      <div className="to-interact__buttons">
        <button className={postLiked ? "button__liked" : null} onClick={undleSubmit}>
          <span>
            <FontAwesomeIcon
              icon={faThumbsUp}
              color={postLiked ? "#38618C" : "gray"}
            />
          </span>
          J'aime
        </button>
      </div>
    </div>
     )}
  ;


export default Like;