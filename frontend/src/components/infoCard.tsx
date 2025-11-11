type InfoCardProps = {
  title: string
  average: number
  simulatedDate: string
}

const InfoCard = ({ title, average, simulatedDate }: InfoCardProps) => {
  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '1rem',
        padding: '1.5rem',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
        textAlign: 'center',
        width: '280px',
      }}
    >
      <h2 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '0.75rem' }}>
        {title}
      </h2>

      <div
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#111827',
        }}
      >
        Average: {average.toFixed(1)}°C
      </div>

      <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.75rem' }}>
        Data assuming the current date is {simulatedDate}
      </p>
    </div>
  )
}

export default InfoCard
