import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import "./Thread.css";

import Like from "../../components/Like/Like";
import Delete from "../DeletePost/DeletePost";
import Update from "../UpdatePost/UpdatePost";
import { dateParser } from "../Utils";

const Thread = ({ token }) => {
  const [listPost, setListPost] = useState([]);
  const [admin, setAdmin] = useState("");

  //Récupere tous les posts
  useEffect(() => {
        axios.get("/api/posts/", {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        .then((reponse) => {
            setListPost(reponse.data);
        })
        .catch((error) => {
            console.log(error)
        });
    },[token]);

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
            setAdmin(reponse.data.admin);
        })
        .catch((error) => {
            console.log(error)
        });
    }, [userID]);

  return (
    <div className="App-body">
      {listPost.map((post, key) => {
        return (
          <div key={key} className="App-comment">
            <div className="title">
              <div className="photoUser">
                <img src={post.user.picture} className="test" alt="" />
                <h2>{post.user.firstname} {post.user.name}</h2>
              </div>
              <div className="icon-post">
                {(post.userId === parseInt(localStorage.getItem("user")) ||
                  admin === true) && <Update postId={post.id} />}
                {(post.userId === parseInt(localStorage.getItem("user")) ||
                  admin === true) && <Delete postId={post.id} />}
              </div>
            </div>
            <div className="body">
              <p> {post.message} </p>
            </div>
            <br></br>
            <img
              src={post.imageURL}
              className={post.imageURL ? "image" : null}
              alt=""
            />
            <br></br>
            <div className="date">
              <p>
                <em>{dateParser(post.createdAt)}</em>
              </p>
            </div>
            <Like postId={post.id} likes={post.likes} />
          </div>
        );
      })}
    </div>
  );
};

export default Thread;
