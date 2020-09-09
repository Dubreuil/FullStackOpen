import React from 'react'
import Country from './Country'

const Content = ({ countries, showClickHandler, weather }) => {
    
    if (countries.length > 10) {
        return (
            <p>Too many matches, be more specific</p>
        )
    }

    else if (countries.length > 1) {
        const displays = countries.map(country => {
            return (
                <div key={country.numericCode + "_div"}>
                    <label key={country.numericCode + "_label"}>{country.name} </label>
                    <button key={country.numericCode + "_button"} onClick={() => showClickHandler(country.name)}>show</button>
                </div>
            )
        })
        return (
            <div>{displays}</div>
        )
    }

    else if (countries.length === 1) {
        const country = countries[0]

        return (
            <div>
                <h1>{country.name}</h1>
                <Country capital={country.capital} population={country.population} languages={country.languages} flag={country.flag} />
            </div>
        )
    }

    else {
        return (
            <p>No country matching the filter</p>
        )
    }
}

export default Content