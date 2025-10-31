import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Spinner from './ui/Spinner'

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()
  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="h-8 w-8 border-gray-300 text-gray-300" />
      </div>
    )
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Outlet />
}


