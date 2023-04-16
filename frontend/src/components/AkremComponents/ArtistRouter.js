import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRouter = ({user, children}) =>{
   if(user.role == "ARTIST"){
     return <Navigate to="/ADDEvent" replace/> 
   } 
   return children
}

export default PrivateRouter