import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setMessageVote, removeMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes}) => {
      if (filter !== '') {
        return anecdotes.filter(anecdote => anecdote.content.includes(filter))
      }
      return anecdotes
    })
    
    const vote = (id, content) => {
        dispatch(voteForAnecdote(id))
        dispatch(setMessageVote(content))
        setTimeout(() => {
          dispatch(removeMessage())
        }, 5000)
    }

    return (
      <div>
        {[...anecdotes].sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
      </div>
    )
}

export default AnecdoteList