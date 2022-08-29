import React,{ useState,useEffect } from "react"
import axios from '../../api/axios';
import './Thread.css'

import Like from "../../components/Like/Like";
import Delete from "../DeletePost/DeletePost";
import Update from "../UpdatePost/UpdatePost";

const POST_URL = '/api/posts/';

const Thread = ({token}) => {

    const [listPost, setListPost] = useState([]);
    //console.log("thread" + token)

    useEffect ( () => {
    //Récupere tous les posts
     axios.get(POST_URL,{
        headers: {
            'Authorization': `Bearer ${token}` 
        }
        })
        .then(reponse => {
           setListPost(reponse.data)
           console.log(reponse.data)
        }) 
        .catch( error => {
              
        })
    },[token])

    return (
        <div className="App-body">
            { listPost.map( (post, key) => {
                return <div key={key} className="App-comment">
                    <div className="title">
                        <div className="photoUser">
                        <img src={post.imageURL} className="test" alt=""/>
                        <h2>{post.user.username}</h2></div>
                        <div className="icon-post">
                        {post.userId === parseInt(localStorage.getItem("user")) && <Update postId={post.id}/> }
                        {post.userId === parseInt(localStorage.getItem("user")) && <Delete postId={post.id}/> }
                        </div>
                    </div>
                    <div className="body">
                       <p> {post.message} </p>
                    </div>
                    <br></br>
                    <img src={post.imageURL} className= {post.imageURL ? "image" : null}  alt=""/>
                    <br></br>
                    <div className="date">
                        <p><em>Post créé le {post.createdAt}</em></p>
                    </div>
                    <Like postId={post.id} likes={post.likes}/>
                </div>

            }) }
       </div>
    )
}
 
export default Thread