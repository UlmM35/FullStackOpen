import Weather from './Weather'

const Country = ({ country, show}) => {
    if (show === false) {
        return null
    }
    const languages = Object.values(country.languages)  
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>Capital {country.capital}</div>
            <div>Area {country.area}</div>
            <h1>Languages</h1>
            <ul>{languages.map(language => <li key={languages.indexOf(language)}>{language}</li>)}</ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            <Weather country={country}/>
        </div>
    )
}

export default Country