import { useState } from 'react'
import PropTypes from 'prop-types'

export default function EventForm({ initial, onSubmit, submitLabel = 'Save' }) {
  const [form, setForm] = useState(
    initial || { title: '', startTime: '', endTime: '' }
  )
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(form)
      }}
      className="grid grid-cols-1 gap-3 md:grid-cols-12"
    >
      <div className="md:col-span-4">
        <input
          placeholder="Event title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
          required
        />
      </div>
      <div className="md:col-span-3">
        <input
          type="datetime-local"
          value={form.startTime}
          onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
          required
        />
      </div>
      <div className="md:col-span-3">
        <input
          type="datetime-local"
          value={form.endTime}
          onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
          required
        />
      </div>
      <div className="md:col-span-2">
        <button className="btn-primary w-full whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-white transition-colors">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

EventForm.propTypes = {
  initial: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
}


