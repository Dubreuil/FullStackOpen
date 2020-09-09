import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import Content from './components/Content'

import axios from 'axios'

function App() {
  const [filterText, setFilterText] = useState('')
  const [displays, setDisplays] = useState([])
  const [countries, setCountries] = useState([])
  
  const handleFilterChange = (event) => setFilterText(event.target.value.toLowerCase())
  const showClickHandler = (value) => setFilterText(value.toLowerCase())

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    const filteredCountries = countries.filter(country => {
      return country.name.toLowerCase().includes(filterText)
    })

    setDisplays(filteredCountries)
  }, [countries, filterText])

  return (
    <div>
      <Filter label="Find countries" filterText={filterText} filterChangeHandler={handleFilterChange} />
      <Content countries={displays} showClickHandler={showClickHandler} />
    </div>
  );
}

export default App;
