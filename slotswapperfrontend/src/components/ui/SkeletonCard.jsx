/* eslint-disable react/prop-types */
export default function SkeletonCard({ lines = 3 }) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="mb-3 h-6 w-1/3 animate-pulse rounded bg-gray-200" />
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-4 w-full animate-pulse rounded bg-gray-200" />
        ))}
      </div>
    </div>
  )
}
