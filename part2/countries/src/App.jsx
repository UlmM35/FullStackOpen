import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
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

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }


  return (
    <div>
      <Filter value={search} onChange={handleSearch}/>
      <Countries search={search} countries={countries}/>
    </div>
  )
}

export default App
