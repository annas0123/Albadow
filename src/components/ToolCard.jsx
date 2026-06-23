import { Link } from 'react-router-dom'
import Card from './Card'

const ToolCard = ({ title, description, icon, path }) => {
  return (
    <Link to={path}>
      <Card className="group h-full hover:border-mercury-blue transition-all duration-300 cursor-pointer">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 bg-mercury-blue/10 rounded-full flex items-center justify-center group-hover:bg-mercury-blue/20 transition-colors duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-medium text-starlight">{title}</h3>
          <p className="text-silver text-sm">{description}</p>
        </div>
      </Card>
    </Link>
  )
}

export default ToolCard
