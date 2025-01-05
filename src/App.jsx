import { useState, useEffect } from 'react'
import axios from 'axios'
import { WiDaySunny, WiRain, WiCloudy, WiDayCloudyHigh } from 'react-icons/wi'
import { FiSearch } from 'react-icons/fi'

function App() {
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_KEY = '0dtxeaqvsgm4yz8n68quf30y8kr26136junuf3iz'

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'clear':
        return <WiDaySunny className="w-20 h-20" />
      case 'rain':
      case 'light_rain':
        return <WiRain className="w-20 h-20" />
      case 'cloudy':
      case 'overcast':
        return <WiCloudy className="w-20 h-20" />
      default:
        return <WiDayCloudyHigh className="w-20 h-20" />
    }
  }

  const fetchWeather = async (searchCity) => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(`https://www.meteosource.com/api/v1/free/point`, {
        params: {
          key: API_KEY,
          place_id: searchCity || 'london',
          sections: 'current'
        }
      })
      console.log('Respuesta de la API:', response.data)
      setWeather(response.data)
    } catch (err) {
      setError('Error al obtener el clima. Por favor, intenta de nuevo.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim()) {
      fetchWeather(city)
    }
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  return (
    <div className="min-h-screen p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-accent mb-8">El Clima Hoy</h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-md mb-8">
        <div className="relative">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Buscar ciudad..."
            className="w-full px-4 py-2 rounded-lg bg-secondary text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-accent hover:text-white transition-colors"
          >
            <FiSearch className="w-6 h-6" />
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 text-red-200 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {weather && !loading && (
        <div className="bg-secondary p-6 rounded-lg shadow-xl w-full max-w-md">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold mb-2">{city || 'London'}</h2>
            {getWeatherIcon(weather.current?.weather)}
            <p className="text-4xl font-bold mb-2">{weather.current?.temperature}°C</p>
            <p className="text-lg text-gray-300">{weather.current?.summary}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-primary p-3 rounded-lg">
              <p className="text-gray-400">Humedad</p>
              <p className="text-xl">{weather.current?.relative_humidity || weather.current?.humidity || 'N/A'}%</p>
            </div>
            <div className="bg-primary p-3 rounded-lg">
              <p className="text-gray-400">Viento</p>
              <p className="text-xl">{weather.current?.wind?.speed || 'N/A'} km/h</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App 