import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function ProtectedRoute2({children}) {
  const navigate = useNavigate()
  if(localStorage.getItem("userToken")){
    return <Navigate to={"/"}/>
  } else{
    return <>{children}</>
  }
}