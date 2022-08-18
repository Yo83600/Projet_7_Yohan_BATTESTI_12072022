import React from "react";
import { Navigate } from "react-router-dom";
import Post from "../../components/Post/Post";
import Thread from '../../components/Thread/Thread'

function Home() {
    
    const token = localStorage.getItem('token');
    console.log(token)

    if(!token){
        return <Navigate to="/login"/>
    }
    
    return (
        <div className="main">
            <Post token={token}/>
            <Thread token={token}/>
        </div>
    )
}
 
export default Home