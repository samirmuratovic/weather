import React, { useEffect, useState } from 'react'
import icons from './icons'

const Icon = ({ conditions }) => {
  const [icon, setIcon] = useState(() => icons[0])

  useEffect(() => {
    const c = conditions.toLowerCase()
    if (c.includes('cloud') || c.includes('overcast')) {
      setIcon(icons[1])
    } else if (c === 'partly cloudy') {
      setIcon(icons[2])
    } else if (c.includes('storm')) {
      setIcon(icons[4])
    } else if (c.includes('storm') && c.includes('rain')) {
      setIcon(icons[6])
    } else if (
      c.includes('rain') ||
      c.includes('drizzle') ||
      c.includes('mist')
    ) {
      setIcon(icons[5])
    } else if (c.includes('snow') || c.includes('blizzard')) {
      setIcon(icons[7])
    } else {
      setIcon(icons[0])
    }
  }, [conditions])

  return icon
}

export default Icon
