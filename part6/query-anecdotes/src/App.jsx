import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './services/requests'
import AnecdoteContext from './AnecdoteContext'
import { useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'VOTE':
            return state = `anecdote '${action.payload}' voted`
        case 'RESET':
            return state = null
        case 'ERROR':
            return state = 'too short anecdote, must have length 5 or more'
        default:
            return state
    }
}


const App = () => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  const queryClient = useQueryClient()

  const updatedNoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    updatedNoteMutation.mutate(updatedAnecdote)
    dispatch({ type: 'VOTE', payload: anecdote.content})
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.error) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <AnecdoteContext.Provider value={[notification, dispatch]}>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </AnecdoteContext.Provider>
    </div>
  )
}

export default App
