import React,{ useState,useEffect } from "react"

import axios from '../../api/axios';

import './Thread.css'

import Like from "../../components/Like/Like";

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
                        <h3>{post.userId}</h3>
                    </div>
                    <div className="body">
                        {post.message}
                    </div>
                    <br></br>
                    <img className="image" src={post.imageURL} alt=""/>
                    <br></br>
                    <div className="date">
                        <p><em>Post créé le {post.createdAt}</em></p>
                    </div>
                     <Like postId={post.id}/>
                </div>

            }) }
       </div>
    )
}
 
export default Thread