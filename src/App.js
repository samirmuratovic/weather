import React, { useEffect, useState } from 'react'

const geocodeURL =
  'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
  encodeURIComponent('Orlando') +
  '.json?access_token=pk.eyJ1Ijoic2FtaXJtdXJhdG92aWMiLCJhIjoiY2s5Mzd4NzMyMDB3NzNybXA3ZDY5NzdlbCJ9.LpHj-Rh9VZXksrcyPBSsXA&limit=1'

// const forecastURL =
//   'http://api.weatherstack.com/current?access_key=5836e2c01908a5bc8ce1b2c9b026a14b&query=' +
//   latitude +
//   ',' +
//   longitude +
//   '&units=f'

// latitude: body.features[0].center[1],
//         longitude: body.features[0].center[0],

const getData = async () => {
  const response = await fetch(geocodeURL)
  const data = await response.json()

  const latitude = data.features[0].center[1]
  const longitude = data.features[0].center[0]
  const location = data.features[0].place_name

  const weatherResponse = await fetch(
    'http://api.weatherstack.com/current?access_key=5836e2c01908a5bc8ce1b2c9b026a14b&query=' +
      latitude +
      ',' +
      longitude +
      '&units=f'
  )

  const weatherData = await weatherResponse.json()
  const weatherObj = {
    ...weatherData,
    location,
  }
  // console.log(weatherData)
  return weatherObj
}

function App() {
  const [weather, setWeather] = useState(() => {})

  useEffect(() => {
    const getWeatherData = async () => {
      const { current, location } = await getData()
      setWeather({ current, location })
    }
    getWeatherData()
  }, [])

  return (
    <article className="h-screen w-screen overflow-hidden">
      <form className="flex justify-center w-full pt-20 bg-blueGray-50">
        <input
          className="w-3/4 md:max-w-xl h-14 transition duration-200 ease-in-out rounded-lg bg-trueGray-100 placeholder-trueGray-500 text-trueGray-500 px-5 border-0 hover:bg-white focus:bg-white focus:ring focus:ring-blue-100"
          placeholder="Search city..."
          autoComplete="off"
          type="text"
          name="city"
          id="id"
        />
      </form>
      <div className="mx-auto flex flex-col bg-blueGray-50 w-96 h-screen px-10 py-20">
        <h2 className="text-center text-4xl text-blueGray-600">
          {weather.location.split(',')[0]}
        </h2>
        <span className="mt-6 text-center text-trueGray-400">
          {weather.current.weather_descriptions[0]}
        </span>
        <svg className="mt-5 mx-auto w-44 h-44">
          <g filter="url(#filter0_d)">
            <circle cx="90" cy="86" r="50" fill="url(#paint0_linear)" />
          </g>
          <g filter="url(#filter1_df)">
            <circle cx="90" cy="86" r="50" fill="url(#paint1_linear)" />
          </g>
          <defs>
            <filter
              id="filter0_d"
              x="0"
              y="0"
              width="180"
              height="180"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="20" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.968627 0 0 0 0 0.709804 0 0 0 0 0.109804 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow"
                result="shape"
              />
            </filter>
            <filter
              id="filter1_df"
              x="30"
              y="26"
              width="120"
              height="120"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="5"
                result="effect2_foregroundBlur"
              />
            </filter>
            <linearGradient
              id="paint0_linear"
              x1="90"
              y1="136"
              x2="90"
              y2="36"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F7B51C" />
              <stop offset="1" stopColor="#FBF039" />
            </linearGradient>
            <linearGradient
              id="paint1_linear"
              x1="90"
              y1="136"
              x2="90"
              y2="36"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F7B51C" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>
        <div className="mt-5 flex justify-between items-center">
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
              {weather.current.precip} %
            </span>
          </div>
          <h1 className="ml-10 text-6xl text-blueGray-600">
            {weather.current.temperature}°
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
              {weather.current.wind_speed} mi / h
            </span>
          </div>
        </div>
        <div className="mt-16 flex justify-between">
          <div className="flex flex-col items-center">
            <div className="pill flex items-center justify-center w-20 h-6 bg-blue-50 rounded-full">
              <span className="text-xs font-semibold text-blue-300">
                {weather.current.humidity < 30
                  ? 'Low'
                  : weather.current.humidity < 60
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
                {weather.current.uv_index < 4
                  ? 'Low'
                  : weather.current.uv_index < 8
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
                {weather.current.cloudcover > 70
                  ? 'Low'
                  : weather.current.cloudcover > 40
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
    </article>
  )
}

export default App
