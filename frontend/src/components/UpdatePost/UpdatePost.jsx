import React, { useState,useEffect } from "react";
import "./UpdatePost.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
const Swal = require('sweetalert2')


  const Update = ({postId}) => {
  // Fonction Delete au click
  const [modal, setModal] = useState(false);
	const [ Message,setMessage] = useState("");
  const [image, setImage] = useState()
    //const RefMessage = useRef();

    useEffect ( () => {
    //Récupere tous les posts
    axios.get(`/api/posts/${postId}`,{
        headers:{
					'Authorization': "Bearer " + localStorage.getItem('token')
				}
        })
        .then(reponse => {
			console.log(reponse.data)
			//console.log(reponse.data.message)
      //console.log(reponse.data.message)
      // console.log(reponse.data.imageURL)
			setMessage(reponse.data.message)
      setImage(reponse.data.imageURL)
        }) 
        .catch( error => {
              
        })
    },[postId])

    const undleSubmit = e => {
        e.preventDefault() // evite le rechargement
 
        const data = new FormData();
        data.append('message', Message);
        data.append('image', image);
 
        //Creer un post
        axios.put(`/api/posts/${postId}`,data, {
        body: data,
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token') 
        }
        })
        .then(reponse => {
          console.log(reponse.data);
          UpdateInfo()
        }) 
        .catch( error => {
        })
    }

    const UpdateInfo = () => {
    Swal.fire({
    icon: 'success',
    title: 'Votre publication à été modifié',
    showConfirmButton: false,
    timer: 1500,
    }).then((result) => {
        if (result) {
      window.location.reload()}
    })
    }

    const toggleModal = () => {
      setModal(!modal);

      if(modal) {
        document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
      }
    };
	
  return (
    <>  <div className="update-post">
        <FontAwesomeIcon
          onClick={toggleModal}
          icon={faPen}
        />
        </div>

      {modal && (
        <div className="modal">
          	<div onClick={toggleModal} className="overlay"></div><div className="modal-content">
					<h2> Modifier votre post</h2>
					<form onSubmit={e => undleSubmit(e)}>
						<label htmlFor="message">Message:</label>
						<textarea
							type="text"
							id="message"
              cols="30" rows="5"
              value={Message}
              onChange={e => setMessage(e.target.value)}
							autoComplete="off" />
						<input className="input-image" type="file" id="image" name="image" onChange={e => setImage(e.target.files[0])} />
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
}

export default Update