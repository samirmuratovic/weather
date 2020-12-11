const axios = require('axios')

const getForecast = async (city) => {
  let status = 'pending'
  let forecast = {}

  try {
    let res

    const forecastURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_FORECAST_KEY}&units=imperial`

    res = await axios(forecastURL)
    status = 'resolved'

    const {
      name: location,
      visibility,
      main: { humidity, temp, pressure },
      weather: [{ description }],
      wind: { speed },
      clouds,
    } = res.data

    forecast = {
      clouds: clouds.all,
      location,
      humidity,
      temp: Math.floor(temp),
      pressure,
      visibility,
      speed: Math.floor(speed),
      description,
      status,
    }
  } catch (e) {
    console.log(e)
    status = 'rejected'
    forecast = {
      status,
    }
  }

  return forecast
}

export default getForecast
