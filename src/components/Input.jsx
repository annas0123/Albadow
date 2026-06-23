const Input = ({ icon, className = '', ...props }) => {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-lead">
          {icon}
        </div>
      )}
      <input
        className={`input-pill ${icon ? 'pl-12' : ''} ${className}`}
        {...props}
      />
    </div>
  )
}

export default Input
