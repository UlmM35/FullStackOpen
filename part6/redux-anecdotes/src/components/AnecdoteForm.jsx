import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setMessageForm, removeMessage } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(anecdote))
        dispatch(setMessageForm(anecdote))
        setTimeout(() => {
          dispatch(removeMessage())
        }, 5000)
    }

    return(
      <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div><input name='anecdote' /></div>
          <button type='submit'>create</button>
        </form>
      </div>
    )
}

export default AnecdoteForm