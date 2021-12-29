import React, { useState, useEffect } from 'react'
import axios from "axios"

const Weather = ({weather}) => {
    return (
        <div>
            <p>temperature: {weather.main.temp}</p>
            <p>wind: {weather.wind.speed}</p>
        </div>
    )
}

const CountryDescription = ({country}) =>
    <div key={country.name.common}>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital[0]}</p>
        <p>Population: {country.population}</p>
        <h3>Languages</h3>
        {Object.values(country.languages).map(lang => <p key={lang}>{lang}</p>)}
        <img src={country.flags.png} alt="" />
    </div>

const CountryRow = ({country, openParam = false}) => {
    const [open, setOpen] = useState(openParam)
    const [weather, setWeather] = useState(null)
    
    const API_KEY_WEATHER = process.env.REACT_APP_API_KEY_WEATHER
    const city = country.capital[0]
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY_WEATHER}`
    useEffect(() => {
        if (open) {
            (async () => { // Make some magic to avoid react warning about async
                const response = await axios.get(url)
                setWeather(response.data)
            })()
        }
    }, [open])

    const name = country.name.common
    
    return (
        <div key={name}>
            {!open &&
                <p>
                    {name}
                    <button onClick={() => setOpen(true)}>Open</button>
                </p>}
            {open && weather && 
                <div>
                    <CountryDescription country={country}/>
                    <Weather weather={weather}/>
                </div>
            }
        </div>
    )
}        

const App = () => {
    const [results, setResults] = useState([])
    const [searchValue, setSearch] = useState("")

    useEffect(() => {
        (async () => { // Make some magic to avoid react warning about async
            const url = "https://restcountries.com/v3.1/all"
            const response = await axios.get(url)
            setResults(response.data)
        })()
    }, [])
    
    const includesSearch = country => country
        .name
        .common
        .toLowerCase()
        .includes(searchValue.toLowerCase())

    const countries = results.filter(includesSearch)

    const resultReporting = () => {
        switch (true) {
            case searchValue.length === 0: return <p>Type something in the field</p>
            case countries.length === 1: return <CountryRow country={countries[0]} openParam={true} />;
            case countries.length === 0: return <p>No results</p>;
            case countries.length > 10: return <p>Too many matches, specify another filter</p>;
            default: return countries.map(country => <CountryRow key={country.name.common} country={country}/>);
        }
    }

    const onSearchChange = event => setSearch(event.target.value);
    return (
        <div>
            <p>Find countries:</p>
            <input type="search" name="county" id="" onChange={onSearchChange} />
            {resultReporting()}
        </div>
    )
}

export default App