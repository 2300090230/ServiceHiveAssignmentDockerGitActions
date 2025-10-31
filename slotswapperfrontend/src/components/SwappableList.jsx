import PropTypes from 'prop-types'

export default function SwappableList({ items, mySlots, onRequest }) {
  if (!items?.length)
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
        <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 7h12M8 12h12M8 17h12M3 7h.01M3 12h.01M3 17h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="text-lg font-medium text-slate-900">No swappable slots available</div>
        <div className="mt-1 text-sm text-slate-600">Check back later for available time slots</div>
      </div>
    )

  return (
    <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {items.map((slot) => (
        <li key={slot.id} className="card-hover group rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold text-slate-900">
                  {slot.title}
                </div>
                <div className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                  {slot.userName}
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex flex-col">
                  <span>{new Date(slot.startTime).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="text-xs text-slate-500">to {new Date(slot.endTime).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2 border-t border-slate-100 pt-4">
              <select 
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100" 
                defaultValue="" 
                id={`select-${slot.id}`}
              >
                <option value="" disabled>Select your slot</option>
                {mySlots.map((s) => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
              <button
                onClick={() => {
                  const sel = document.getElementById(`select-${slot.id}`)
                  if (sel && sel.value) onRequest(sel.value, slot.id)
                }}
                className="btn-primary w-full rounded-md px-4 py-2 text-sm font-medium"
              >
                Request Swap
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

SwappableList.propTypes = {
  items: PropTypes.array,
  mySlots: PropTypes.array,
  onRequest: PropTypes.func.isRequired,
}


