import React, { useState, useEffect } from "react";
import "./UpdatePost.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Update = ({ postId }) => {

  const [modal, setModal] = useState(false);
  const [Message, setMessage] = useState("");
  const [image, setImage] = useState();

  useEffect(() => {
    // récupere les postsId
    axios.get(`/api/posts/${postId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((reponse) => {
      setMessage(reponse.data.message);
      setImage(reponse.data.imageURL);
    })
    .catch((error) => {
      console.log(error)
    });
  },[postId]);

  const updateSubmit = (e) => {
    e.preventDefault(); // evite le rechargement

    // data des posts
    const data = new FormData();
    data.append("message", Message);
    data.append("image", image);

    // modifier un post
    axios.put(`/api/posts/${postId}`, data, {
      body: data,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((reponse) => {
      console.log(reponse.data);
      UpdateInfo();
    })
    .catch((error) => {
      console.log(error)
    });
  };

  // notification de la modification du post
  const UpdateInfo = () => {
    Swal.fire({
      icon: "success",
      title: "Votre publication à été modifié",
      showConfirmButton: false,
      timer: 1500,
    }).then((result) => {
      if (result) {
        window.location.reload();
      }
    });
  };

  // condition pour que le modal s'affiche et se ferme
  const toggleModal = () => {
    setModal(!modal);

    if (modal) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  };

  // affichage de la photo dans le input
  const loadFile = function(e) {
    var reader = new FileReader();
    reader.onload = function(){
      var output = document.querySelector("#output-image");
      output.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      {" "}
      <div className="update-post">
        <FontAwesomeIcon onClick={toggleModal} icon={faPen} />
      </div>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2> Modifier votre post</h2>
            <form onSubmit={(e) => updateSubmit(e)}>
              <label htmlFor="message">Message:</label>
              <textarea
                type="text"
                id="message"
                cols="30"
                rows="5"
                value={Message}
                onChange={(e) => setMessage(e.target.value)}
                autoComplete="off"
              />
              <input
                className="input-image"
                type="file"
                id="image"
                name="image"
                onChange={(e) => {
                  setImage(e.target.files[0])
                  loadFile(e)
                }}
              />
              {image && <img id="output-image" alt=""/>}
              <button id="save">Modifier</button>
            </form>
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Update;


