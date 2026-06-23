const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'btn-pill font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-mercury-blue text-pure-white hover:bg-ghost-blue hover:text-deep-space',
    secondary: 'bg-graphite text-starlight border border-lead hover:border-mercury-blue',
    ghost: 'bg-transparent text-starlight hover:text-mercury-blue',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
