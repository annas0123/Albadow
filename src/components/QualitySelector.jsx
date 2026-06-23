const QualitySelector = ({ options, selected, onSelect, label = 'Quality' }) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm text-silver">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`px-4 py-2 rounded-pill text-sm font-medium transition-all duration-200 ${
              selected === option.value
                ? 'bg-mercury-blue text-pure-white'
                : 'bg-graphite text-silver hover:text-starlight border border-lead hover:border-mercury-blue'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QualitySelector
