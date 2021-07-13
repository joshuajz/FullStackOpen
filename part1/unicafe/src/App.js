import React, { useState } from 'react'

const Button = ({label, clickEvent}) => {
  return (
    <>
      <button onClick={clickEvent}>{label}</button>
    </>
  )
}

const Stats = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  return (
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {(good - bad) / (all)}</p>
      <p>positive {(good / (all)) * 100}%</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodIncrement = () => setGood(good + 1)



  return (
    <div>
      <h1>Give Feedback</h1>
      <Button label='good' clickEvent={goodIncrement}/>
      <Button label='neutral' clickEvent={() => setNeutral(neutral + 1)}/>
      <Button label='bad' clickEvent={() => setBad(bad + 1)}/>
      <h1>Statistics</h1>
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
