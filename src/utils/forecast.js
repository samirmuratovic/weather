const axios = require('axios')

const getForecast = async (city) => {
  let status = 'pending'
  let forecast = {}

  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    city
  )}.json?access_token=${'pk.eyJ1Ijoic2FtaXJtdXJhdG92aWMiLCJhIjoiY2s5Mzd4NzMyMDB3NzNybXA3ZDY5NzdlbCJ9.LpHj-Rh9VZXksrcyPBSsXA'}&limit=1`

  try {
    let res
    res = await axios(geocodeURL)

    const latitude = res.data.features[0].center[1]
    const longitude = res.data.features[0].center[0]
    const location = res.data.features[0].place_name

    const forecastURL = `http://api.weatherstack.com/current?access_key=${'5836e2c01908a5bc8ce1b2c9b026a14b'}&query=${latitude},${longitude}&units=f`

    res = await axios(forecastURL)
    status = 'resolved'

    forecast = {
      ...res.data,
      location,
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

module.exports = getForecast
