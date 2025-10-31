import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { authApi } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(!!token)

  useEffect(() => {
    if (!token) return
    authApi
      .me()
      .then((me) => setUser(me))
      .catch(() => {
        localStorage.removeItem('token')
        setToken(null)
      })
      .finally(() => setLoading(false))
  }, [token])

  const login = async ({ email, password }) => {
    const res = await authApi.login({ email, password })
    localStorage.setItem('token', res.token)
    setToken(res.token)
    setUser({ id: res.userId, name: res.name, email: res.email })
    return res
  }

  const signup = async ({ name, email, password }) => {
    const res = await authApi.signup({ name, email, password })
    localStorage.setItem('token', res.token)
    setToken(res.token)
    setUser({ id: res.userId, name: res.name, email: res.email })
    return res
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({ token, user, loading, login, signup, logout, isAuthenticated: !!token }),
    [token, user, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


