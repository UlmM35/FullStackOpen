import { useState } from 'react'

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <table>
      <tbody>
        <tr>
          <Statisticline text="good" value={props.good} />
        </tr>
        <tr>
          <Statisticline text="neutral" value={props.neutral} />
        </tr>
        <tr>
          <Statisticline text="bad" value={props.bad} />
        </tr>
        <tr>
          <Statisticline text="all" value={props.total} />
        </tr>
        <tr>
          <Statisticline text="average" value={props.average/props.total} />
        </tr>
        <tr>
          <Statisticline text="positive" value={props.good/props.total * 100 + "%"} />
        </tr>
      </tbody>
    </table>
  )
}

const Statisticline = ({text, value}) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setTotal(total + 1)
    setAverage(average + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    setAverage(average - 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} />
    </div>
  )
}

export default App
