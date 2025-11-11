import './App.css'
import { useEffect, useState } from 'react'
import InfoCard from './components/infoCard'

const App = () => {
  const [average, setAverage] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const simulatedDate = '2025-10-08'
  const location = 'Düsseldorf'
  const from = '2025-09-25T00:00:00.000Z';
  const to = '2025-10-08T00:00:00.000Z';
  const baseUrl = 'http://localhost:3000/temperatures/calculateAvg'

  const url = new URL(baseUrl)
  url.searchParams.append('from', from)
  url.searchParams.append('to', to)
  url.searchParams.append('location', location)

  useEffect(() => {
    const fetchAverageTemperature = async () => {
      try {
        const response = await fetch(url.toString())

        if (!response.ok) throw new Error('Failed to fetch data')

        const data = await response.json()
        setAverage(data.data.average);
      } catch (err) {
        console.error('Error fetching temperature:', err)
        setError('Could not retrieve temperature data')
      } finally {
        setLoading(false)
      }
    }

    fetchAverageTemperature()
  }, [])

  if (loading) return <p>Loading temperature data...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <body
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #e0f2fe, #f3f4f6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '4rem 2rem',
      }}
    >
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1e3a8a', fontWeight: 'bold' }}>
          Simple Weather Page
        </h1>
        <p style={{ color: '#475569', fontSize: '1.1rem' }}>
          Check the average temperature for the last 14 days
        </p>
      </header>

      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {average !== null && (
          <InfoCard
            title={`${location} - Last 14 Days`}
            average={average}
            simulatedDate={simulatedDate}
          />
        )}
      </div>
</body>

  )
}

export default App;
