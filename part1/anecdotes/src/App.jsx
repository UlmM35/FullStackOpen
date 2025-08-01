import { useState } from 'react'

const Button = ({ onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(10))

  const getRandomIntInclusive = (min, max) => {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    const num = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
    return num
  }


  const handleVote = () => {

    const copy = [...votes]

    copy[selected] += 1

    setVotes(copy)

  }

  return (
    <div>
      {anecdotes[selected]}
      <div>has {votes[selected]} votes</div>
      <Button onClick={handleVote} text={"vote"} />
      <Button onClick={() => setSelected(getRandomIntInclusive(0, anecdotes.length - 1))} text={"next anecdote"} />
      <h1>Anecdote with most votes</h1>
      {anecdotes[votes.indexOf(Math.max(...votes))]}
      <div>has {votes[votes.indexOf(Math.max(...votes))]  } votes</div>
    </div>
  )
}

export default App
