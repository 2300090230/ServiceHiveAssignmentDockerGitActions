import PropTypes from 'prop-types'

export default function PrimaryButton({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 btn-primary disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  )
}

PrimaryButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}
