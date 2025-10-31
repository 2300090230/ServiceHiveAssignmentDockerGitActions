import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../components/Navbar'
import { swapApi } from '../services/api'
import { toast } from 'react-toastify'
import SkeletonCard from '../components/ui/SkeletonCard'

export default function Requests() {
  const [incoming, setIncoming] = useState([])
  const [outgoing, setOutgoing] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const [inc, out] = await Promise.all([swapApi.incoming(), swapApi.outgoing()])
      setIncoming(inc)
      setOutgoing(out)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const decide = async (id, accept) => {
    try {
      await swapApi.respond(id, { accept })
      toast.success(accept ? 'Request accepted' : 'Request declined ')
      await load()
    } catch {
      toast.error('Failed to update request')
    }
  }

  const List = ({ title, items, actionButtons }) => (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">{title}</h2>
      {!items?.length ? (
        <div className="rounded-lg bg-slate-50 p-8 text-center text-slate-500">
          <svg className="mx-auto mb-3 h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <div className="text-sm font-medium">No requests</div>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((r) => (
            <li key={r.id} className="card-hover rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2 text-sm">
                    <span className="font-medium text-slate-900">{r.requesterName}</span>
                    <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <span className="font-medium text-slate-900">{r.receiverName}</span>
                  </div>
                  <div className="mb-2 text-sm text-slate-600">
                    {r.requesterSlot?.title} <span className="text-slate-400">↔</span> {r.receiverSlot?.title}
                  </div>
                  <div>
                    <span className="badge-warning rounded-md px-2 py-1 text-xs font-medium uppercase">{r.status}</span>
                  </div>
                </div>
                <div className="flex gap-2">{actionButtons?.(r)}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  List.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array,
    actionButtons: PropTypes.func,
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Requests</h1>
          <p className="mt-1 text-sm text-slate-600">Manage incoming and outgoing swap requests</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            <SkeletonCard lines={3} />
            <SkeletonCard lines={2} />
          </div>
        ) : (
          <>
            <List
              title="Incoming Requests"
              items={incoming}
              actionButtons={(r) => (
                <div className="flex gap-2">
                  <button 
                    onClick={() => decide(r.id, true)} 
                    className="btn-secondary rounded-md px-3 py-1.5 text-xs font-medium"
                  >
                    Accept
                  </button>
                  <button 
                    onClick={() => decide(r.id, false)} 
                    className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                  >
                    Decline
                  </button>
                </div>
              )}
            />
            <List title="Outgoing Requests" items={outgoing} />
          </>
        )}
      </main>
    </div>
  )
}


