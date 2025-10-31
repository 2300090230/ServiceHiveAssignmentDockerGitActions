import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import Spinner from '../components/ui/Spinner'
import PrimaryButton from '../components/ui/PrimaryButton'
import Logo from '../components/ui/Logo'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form)
      toast.success('Signed in successfully')
      navigate('/')
    } catch {
      setError('Invalid email or password')
      toast.error('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 to-blue-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex">
            <Logo size={10} />
          </div>
          <p className="text-sm text-slate-600">Enterprise Time Slot Management</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold text-slate-900">Sign in to your account</h2>
          {error && <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-800">{error}</div>}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Email address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Enter your password"
                required
              />
            </div>
            <PrimaryButton disabled={loading} className="w-full justify-center py-2.5 text-sm font-medium">
              {loading && <Spinner className="h-4 w-4 border-white" />}
              <span>{loading ? 'Signing in…' : 'Sign in'}</span>
            </PrimaryButton>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account? <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-700">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}


