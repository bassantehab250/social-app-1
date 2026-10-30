import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!localStorage.getItem("userToken")) {
    return <Navigate to="/login" />
  } else {
    return <>{children}</>
  }
}