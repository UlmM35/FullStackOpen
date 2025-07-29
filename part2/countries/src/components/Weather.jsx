import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const kelvin = -273.15



const Weather = ({ country }) => {
    const [weatherData, setWeatherData] = useState(null)

    if (weatherData === null) {
        return null
    }

    useEffect(() => {
            axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${country.capital}&appid=${process.env.api_key}`).then(response => {
                setWeatherData(response)
            })
    }, [weatherData])

    return (
        <div>
            <h1>Weather in {country.capital}</h1>
            <div>Temperature {Math.round(weatherData.list[0].main.temp + (kelvin))} Celsius</div>
            <img src={weatherData.list[0].weather.icon} alt="Weather icon" />
            <div>Wind {weatherData.list[0].wind.speed} m/s</div>
        </div>
    )
}

export default Weather