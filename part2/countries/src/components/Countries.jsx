import Country from './Country'
import { useState } from 'react'

const Countries = ({search, countries}) => {
    const [showInfo, setShowInfo] = useState(false)
    const [countryId, setCountryId] = useState(0)

    const filteredCountries = search ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())) : countries

    const handleShow = (event) => {
        setCountryId(event.target.id)
        setShowInfo(!showInfo)
    }
        
    if (filteredCountries.length > 10) {
        return 'Too many matches, specify another filter'
    }

    else if (filteredCountries.length === 1) {
        const filteredCountry = filteredCountries.find(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
        return (
            <Country country={filteredCountry} show={true}/>
        )
    }

    return (
        <div>
            {filteredCountries.map(country => <div key={filteredCountries.indexOf(country)}>{country.name.common} <button onClick={handleShow} id={filteredCountries.indexOf(country)}>Show</button> </div>)}
            <Country country={filteredCountries[countryId]} show={showInfo}/>
        </div>
    )
}

export default Countries