import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import EventForm from '../components/EventForm'
import EventList from '../components/EventList'
import SwappableList from '../components/SwappableList'
import { eventsApi, swapApi } from '../services/api'
import { toast } from 'react-toastify'
import SkeletonCard from '../components/ui/SkeletonCard'

export default function Dashboard() {
  const [events, setEvents] = useState([])
  const [swappable, setSwappable] = useState([])
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState(null)
  const [tab, setTab] = useState('events')

  const load = async () => {
    setLoading(true)
    try {
      const [mine, sw] = await Promise.all([eventsApi.listMine(), swapApi.swappableSlots()])
      setEvents(mine)
      setSwappable(sw.filter((s) => !mine.find((m) => m.id === s.id)))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const onCreate = async (payload) => {
    try {
      if (edit) {
        await eventsApi.update(edit.id, payload)
        setEdit(null)
        toast.success('Event updated')
      } else {
        await eventsApi.create(payload)
        toast.success('Event created')
      }
      await load()
    } catch {
      toast.error('Failed to save event')
    }
  }

  const onDelete = async (e) => {
    try {
      await eventsApi.delete(e.id)
      toast.success('Event deleted')
      await load()
    } catch {
      toast.error('Failed to delete event')
    }
  }

  const onStatus = async (e, status) => {
    try {
      await eventsApi.updateStatus(e.id, { status })
      toast.success(`Marked ${status}`)
      await load()
    } catch {
      toast.error('Failed to update status')
    }
  }

  const onRequest = async (mySlotId, theirSlotId) => {
    try {
      await swapApi.createRequest({ mySlotId, theirSlotId })
      toast.success('Swap request sent')
    } catch {
      toast.error('Failed to send request or First make your slot swappable')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">Calendar</h1>
          <p className="mt-1 text-sm text-slate-600">Manage your time slots and availability</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-slate-200">
          <nav className="-mb-px flex gap-6">
            <button 
              onClick={() => setTab('events')} 
              className={`border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
                tab==='events'
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              My Events
            </button>
            <button 
              onClick={() => setTab('swappable')} 
              className={`border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
                tab==='swappable'
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              Available Slots
            </button>
          </nav>
        </div>

        {/* Stats Cards */}
        {!loading && (
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-2">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-slate-900">{events.length}</div>
                  <div className="text-sm text-slate-600">Total Events</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-50 p-2">
                  <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-slate-900">
                    {events.filter(e => e.status === 'SWAPPABLE').length}
                  </div>
                  <div className="text-sm text-slate-600">Swappable</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-violet-50 p-2">
                  <svg className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-slate-900">{swappable.length}</div>
                  <div className="text-sm text-slate-600">Available</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'events' ? (
          <div className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                <div className="rounded-lg border border-slate-200 bg-white p-5">
                  <SkeletonCard lines={2} />
                </div>
                <div className="space-y-3">
                  <SkeletonCard lines={3} />
                  <SkeletonCard lines={3} />
                </div>
              </div>
            ) : (
              <>
                <div className="rounded-lg border border-slate-200 bg-white p-5">
                  <h2 className="mb-4 text-lg font-semibold text-slate-900">
                    {edit ? 'Edit Event' : 'Create New Event'}
                  </h2>
                  <EventForm 
                    initial={edit ? { title: edit.title, startTime: edit.startTime, endTime: edit.endTime } : undefined} 
                    onSubmit={onCreate} 
                    submitLabel={edit ? 'Update' : 'Create'} 
                  />
                </div>
                <EventList items={events} onEdit={setEdit} onDelete={onDelete} onStatus={onStatus} />
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {loading ? (
              <div>
                <SkeletonCard lines={3} />
              </div>
            ) : (
              <SwappableList items={swappable} mySlots={events} onRequest={onRequest} />
            )}
          </div>
        )}
      </main>
    </div>
  )
}


