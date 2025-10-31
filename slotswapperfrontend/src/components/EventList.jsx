import PropTypes from 'prop-types'

export default function EventList({ items, onEdit, onDelete, onStatus }) {
  const badge = (status) => {
    if (status === 'SWAPPABLE') {
      return (
        <span className="badge-success inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium uppercase">
          SWAPPABLE
        </span>
      )
    }
    const classes = {
      BUSY: 'badge-danger',
      SWAP_PENDING: 'badge-warning',
    }[status] || 'bg-slate-100 text-slate-700 border-slate-200'
    return <span className={`rounded-md border px-2 py-1 text-xs font-medium uppercase ${classes}`}>{status}</span>
  }
  
  if (!items?.length)
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
        <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="text-lg font-medium text-slate-900">No events yet</div>
        <div className="mt-1 text-sm text-slate-600">Create your first event to get started</div>
      </div>
    )

  return (
    <ul className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
      {items.map((e) => (
        <li key={e.id} className="card-hover group rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="font-semibold text-slate-900">{e.title}</div>
                <div className="mt-1.5 flex items-center gap-2 text-sm text-slate-600">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{new Date(e.startTime).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="text-slate-400">→</span>
                  <span>{new Date(e.endTime).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="mt-2.5">{badge(e.status)}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
              <button onClick={() => onStatus(e, 'SWAPPABLE')} className="btn-secondary flex-1 rounded-md px-3 py-2 text-xs font-medium">
                Mark Swappable
              </button>
              <button onClick={() => onStatus(e, 'BUSY')} className="flex-1 rounded-md bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700">
                Mark Busy
              </button>
              <button onClick={() => onEdit(e)} className="rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
                Edit
              </button>
              <button onClick={() => onDelete(e)} className="rounded-md border border-red-300 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50">
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

EventList.propTypes = {
  items: PropTypes.array,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStatus: PropTypes.func.isRequired,
}


