import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../services/requests'
import { useDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({type: 'ADDED', payload: data.content})
    },
    onError: (e) => dispatch({type: 'ERROR', payload: e.response.data.error })
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
