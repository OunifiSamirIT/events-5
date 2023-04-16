import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRouter = ({user, children}) =>{
   if(user.role == "USER"){
     return <Navigate to="/homeuser" replace/> 
   } 
   return children
}

export default PrivateRouter