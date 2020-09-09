import React from 'react'
import Weather from './Weather'

const Country = ({ capital, population, languages, flag }) => {
    
    const languagesList = languages.map(language => {
        return <li key={language.iso639_1}>{language.name}</li>
    })

    return (
        <div>
            <p>Capital: {capital}</p>
            <p>Population: {population}</p>
            <h2>Languages</h2>
            <ul>
                {languagesList}
            </ul>
            <img src={flag} alt="Flag"/>
            <Weather capital={capital} />
        </div>
    )
}

export default Country