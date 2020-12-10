const getForecast = async (city) => {
  let status = 'pending'
  let forecast = {}

  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    city
  )}.json?access_token=${process.env.REACT_APP_GEOCODE_KEY}&limit=1`

  try {
    let res, data
    res = await fetch(geocodeURL)
    data = await res.json()

    const latitude = data.features[0].center[1]
    const longitude = data.features[0].center[0]
    const location = data.features[0].place_name

    const forecastURL = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_FORECAST_KEY}&query=${latitude},${longitude}&units=f`

    res = await fetch(forecastURL)
    data = await res.json()
    status = 'resolved'

    forecast = {
      ...data,
      location,
      status,
    }
  } catch (e) {
    status = 'rejected'
    forecast = {
      status,
    }
  }

  return forecast
}

export default getForecast
