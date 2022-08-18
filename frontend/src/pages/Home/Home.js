import React from "react";
import { Navigate } from "react-router-dom";
import Thread from '../../components/Thread/Thread'

function Home() {
    
    const token = localStorage.getItem('token');
    console.log(token)

    if(!token){
        return <Navigate to="/login"/>
    }
    
    return (
        <div className="main">
            <Thread token={token}/>
        </div>
    )
}
 
export default Home