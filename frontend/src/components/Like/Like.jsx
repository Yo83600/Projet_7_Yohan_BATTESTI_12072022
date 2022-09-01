import React, { useState } from "react";
import axios from "axios";

import "./Like.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const Like = ({ postId, likes }) => {
  // variable pour verifier le nombre de likes
  const nbrLike = likes.length > 0 ? likes.length : 0;

  // utilisation de find pour savoir le userID qui est connecté a déjà mit un like
  const userIdCurrent = localStorage.getItem("user");
  const userFind = likes.find((elt) => elt.userId === parseInt(userIdCurrent));
  const postIfLike = userFind ? true : false;

  const [nbOfLikes, setNbOfLikes] = useState(nbrLike);
  const [postLiked, setPostLiked] = useState(postIfLike);

  const likeSubmit = (e) => {
    e.preventDefault();

    const data = {
      userLike: localStorage.getItem("user"),
      postId: postId,
    };

    //methode post pour like le post
    axios.post(`/api/posts/${postId}/like`, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((reponse) => {
      // message du backend
      const { message } = reponse.data;
      // condition if/else par rapport au message renvoyé par le backend
      if (message === "Post disliké") {
        let newNbrLike = nbOfLikes - 1;
        setNbOfLikes(newNbrLike);
        setPostLiked(false);
      } else {
        let newNbrLike = nbOfLikes + 1;
        setNbOfLikes(newNbrLike);
        setPostLiked(true);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="to-interact">
      <div className="to-interact__nb-of-likes">
        <span
          className={postLiked ? "button__liked" : null}
          onClick={likeSubmit}
        >
          <FontAwesomeIcon
            icon={faThumbsUp}
            color={postLiked ? "#38618C" : "grey"}
          />
        </span>
        <p className="to-interact__nb-of-likes--number">{nbOfLikes}</p>
      </div>
      <div className="to-interact__buttons"></div>
    </div>
  );
};

export default Like;