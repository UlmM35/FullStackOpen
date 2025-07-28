import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response =>  {
          setCountries(response.data)
        })
  }, [])

  const countriesThatMatch = () => {
    const filteredCountries = search ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())) : countries

    if (filteredCountries.length > 10) {
      return 'Too many matches, specify another filter'
    }
    else if (filteredCountries.length < 10 && filteredCountries.length !== 1) {
      return <div>{filteredCountries.map(country => <div key={filteredCountries.indexOf(country)}> {country.name.common}</div>)}</div>
    }

    else if (filteredCountries.length === 1) {
      const filteredCountry = filteredCountries.find(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
      return (
        <div>
          <h1>{filteredCountry.name.common}</h1>
          <div>Capital {filteredCountry.capital}</div>
          <div>Area {filteredCountry.area}</div>
          <h1>Languages</h1>
          <img src={filteredCountry.flags.png} alt={filteredCountry.flags.alt} />
        </div>
      )
    }
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }


  return (
    <div>
      <Filter value={search} onChange={handleSearch}/>
      {countriesThatMatch()}
    </div>
  )
}

export default App
