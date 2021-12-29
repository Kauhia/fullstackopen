import React, { useState, useEffect } from 'react'
import axios from "axios"

const CountryItem = (country) => <p key={country.name.common}>{country.name.common}</p>
const CountryDescription = (country) =>
    <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital[0]}</p>
        <p>Population: {country.population}</p>
        <h3>Languages</h3>
        {Object.values(country.languages).map(lang => <p>{lang}</p>)}
        <img src={country.flags.png} alt="" />
    </div>

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
            case countries.length > 10: return <p>Too many matches, specify another filter</p>;
            case countries.length === 1: return CountryDescription(countries[0]);
            case countries.length === 0: return <p>No results</p>;
            default: return countries.map(CountryItem);
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