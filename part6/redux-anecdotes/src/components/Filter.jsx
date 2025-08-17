import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {

    const dispatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        const filter = event.target.value
        dispatch(filterChange(filter))
    }
    
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input name='filter' onChange={handleChange} />
        </div>
    )

}

export default Filter