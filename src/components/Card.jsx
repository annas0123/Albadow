const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`card-sharp ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
