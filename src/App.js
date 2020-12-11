import React, { useEffect, useState } from 'react'
import Icon from './Icon'
import getForecast from './utils/forecast'

function App() {
  const [forecast, setForecast] = useState(() => ({
    current: {},
    location: '',
  }))

  useEffect(() => {
    async function fetchForecast() {
      const { current, location } = await getForecast('Orlando')
      setForecast({ current, location })
      setFetchStatus('resolved')
    }
    fetchForecast()
  }, [])

  const [city, setCity] = useState(() => '')
  const [fetchStatus, setFetchStatus] = useState(() => 'idle')

  const handleFetchForecast = async (e) => {
    e.preventDefault()

    if (!city) return

    const { status, current, location } = await getForecast(city)

    setFetchStatus(status)

    if (status === 'resolved') {
      setForecast({ current, location })
      setCity('')
    }
  }

  return (
    <article className="max-h-screen w-screen">
      {fetchStatus === 'rejected' ? (
        <div className="absolute w-full text-center mx-auto mt-6 rounded-lg text-red-400 text-sm  p-2">
          Please enter a valid city
        </div>
      ) : null}
      <form
        onSubmit={handleFetchForecast}
        className="flex flex-col justify-center items-center w-full pt-20 bg-white"
      >
        <input
          className={`w-3/4 md:max-w-xl h-14 transition duration-200 ease-in-out rounded-lg bg-trueGray-100 placeholder-trueGray-500 text-trueGray-500 px-5 border-0 hover:bg-white focus:bg-white focus:ring ${
            fetchStatus === 'rejected'
              ? 'focus:ring-red-100'
              : 'focus:ring-blue-100'
          }`}
          placeholder="Search city..."
          autoComplete="off"
          type="text"
          name="city"
          id="id"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </form>

      {forecast.location ? (
        <div className="mx-auto flex flex-col bg-white w-96 max-h-full px-10 py-12">
          <h2 className="text-center text-4xl text-blueGray-600">
            {forecast.location.split(',')[0]}
          </h2>
          <span className="mt-6 text-center text-trueGray-400">
            {forecast.current.weather_descriptions[0]}
          </span>
          <div className="flex items-center align-center my-8 mx-auto w-44 h-44">
            <Icon conditions={forecast.current.weather_descriptions[0]} />
          </div>
          <div className="mt-5 ml-3 mr-3 flex justify-between items-center">
            <div className="flex flex-col items-center">
              <svg className="w-5 h-5">
                <g transform="translate(-34 -486)">
                  <path
                    d="M71.037,2.922A25.529,25.529,0,0,1,69.083.191a.433.433,0,0,0-.717,0,25.655,25.655,0,0,1-1.955,2.732c-1.382,1.763-2.687,3.428-2.687,5.4a5,5,0,1,0,10,0C73.724,6.35,72.419,4.685,71.037,2.922Z"
                    transform="translate(-29.724 486)"
                    fill="#94a3b8"
                  />
                  <path
                    d="M71.037,2.922A25.529,25.529,0,0,1,69.083.191a.433.433,0,0,0-.717,0,25.655,25.655,0,0,1-1.955,2.732c-1.382,1.763-2.687,3.428-2.687,5.4a5,5,0,1,0,10,0C73.724,6.35,72.419,4.685,71.037,2.922Z"
                    transform="translate(-19.724 493)"
                    fill="#94a3b8"
                  />
                </g>
              </svg>
              <span className="mt-3 text-blueGray-400">
                {forecast.current.precip} %
              </span>
            </div>
            <h1 className="ml-10 text-6xl text-blueGray-600">
              {forecast.current.temperature}°
            </h1>
            <div className="flex flex-col items-center">
              <svg className="w-7 h-5">
                <g transform="translate(0 -48)">
                  <g transform="translate(0.074 51.754)">
                    <g transform="translate(0 0)">
                      <path
                        d="M23.714,112a3.758,3.758,0,0,0-3.754,3.754.938.938,0,0,0,1.877,0,1.877,1.877,0,1,1,1.877,1.877H2.2a.938.938,0,0,0,0,1.877H23.714a3.754,3.754,0,1,0,0-7.507Z"
                        transform="translate(-1.266 -112)"
                        fill="#94a3b8"
                      />
                    </g>
                  </g>
                  <g transform="translate(0 48)">
                    <g transform="translate(0 0)">
                      <path
                        d="M13.138,48a3.758,3.758,0,0,0-3.754,3.754.938.938,0,1,0,1.877,0,1.877,1.877,0,1,1,1.877,1.877H.938a.938.938,0,1,0,0,1.877h12.2a3.754,3.754,0,0,0,0-7.507Z"
                        transform="translate(0 -48)"
                        fill="#94a3b8"
                      />
                    </g>
                  </g>
                  <g transform="translate(0 61.138)">
                    <g transform="translate(0 0)">
                      <path
                        d="M13.138,272H.938a.938.938,0,1,0,0,1.877h12.2a1.877,1.877,0,1,1-1.877,1.877.938.938,0,1,0-1.877,0A3.754,3.754,0,1,0,13.138,272Z"
                        transform="translate(0 -272)"
                        fill="#94a3b8"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <span className="mt-3 text-blueGray-400">
                {forecast.current.wind_speed} mi / h
              </span>
            </div>
          </div>
          <div className="mt-16 flex justify-between">
            <div className="flex flex-col items-center">
              <div className="pill flex items-center justify-center w-20 h-6 bg-blue-50 rounded-full">
                <span className="text-xs font-semibold text-blue-300">
                  {forecast.current.humidity < 30
                    ? 'Low'
                    : forecast.current.humidity < 60
                    ? 'Moderate'
                    : 'High'}
                </span>
              </div>
              <span className="mt-4 text-xs font-semibold text-blueGray-500">
                Humidity
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="pill flex items-center justify-center w-20 h-6 bg-trueGray-100 rounded-full">
                <span className="text-xs font-semibold text-trueGray-400">
                  {forecast.current.uv_index < 4
                    ? 'Low'
                    : forecast.current.uv_index < 8
                    ? 'Moderate'
                    : 'High'}
                </span>
              </div>
              <span className="mt-4 text-xs font-semibold text-blueGray-500">
                UV
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="pill flex items-center justify-center w-20 h-6 bg-yellow-100 rounded-full">
                <span className="text-xs font-semibold text-yellow-400">
                  {forecast.current.cloudcover > 70
                    ? 'Low'
                    : forecast.current.cloudcover > 40
                    ? 'Moderate'
                    : 'High'}
                </span>
              </div>
              <span className="mt-4 text-xs font-semibold text-blueGray-500">
                Pollen
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  )
}

export default App
