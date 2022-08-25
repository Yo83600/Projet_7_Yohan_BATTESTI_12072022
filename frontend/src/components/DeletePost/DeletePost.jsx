import React from "react";
import axios from "axios";
import './DeletePost.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

const Delete = ({postId}) => {
  // Fonction Delete au click
	const DeleteClick = () => {
		axios.delete(`/api/posts/${postId}`, {
				headers: {
					'Authorization': "Bearer " + localStorage.getItem('token')
				}
			})
			.then(reponse => {
				if (reponse.status === 200) document.location.reload();
				console.log(reponse.data)
			})
			.catch(error => {})
	}
  // Popup pour confirmer la suppresion du post
	const DeleteAlerte = () => {
		Swal.fire({
			title: 'Êtes-vous sûr(e) ?',
			text: "Le post sera definitivement supprimer!",
			icon: 'error',
			showDenyButton: true,
			denyButtonText: 'Retour',
			confirmButtonColor: '#3085d6',
			confirmButtonText: 'Supprimer'
		}).then((result) => {
			if (result.isConfirmed) {
				DeleteClick()
			}
		})
	}

  return (
      <div className="delete-post">
        <FontAwesomeIcon
          onClick={DeleteAlerte}
          icon={faTrash}
        />
      </div>
  )
};


export default Delete;