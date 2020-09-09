import React, { useState, useEffect } from 'react'

import axios from 'axios'

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState(undefined)

    const api_key = process.env.REACT_APP_API_KEY
    
    useEffect(() => {
        axios
            .get('https://api.openweathermap.org/data/2.5/weather?q=' + capital + '&appid=' + api_key)
            .then(response => {
              setWeather(response.data)
            })
    }, [capital, api_key])
    
    if (weather !== undefined) {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <p>Temperature: {Math.round((weather.main.temp - 273)*10)/10} Celsius</p>
                <p>{weather.weather[0].description}</p>
            </div>
        )
    }
    else {
        return null
    }
}   

export default Weather