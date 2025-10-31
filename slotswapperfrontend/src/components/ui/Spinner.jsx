/* eslint-disable react/prop-types */
export default function Spinner({ className = 'h-5 w-5', ariaLabel = 'loading' }) {
  // lightweight spinner using Tailwind classes (border + animate-spin)
  return (
    <div role="status" aria-label={ariaLabel} className={`inline-block ${className} animate-spin rounded-full border-2 border-t-transparent`} />
  )
}
