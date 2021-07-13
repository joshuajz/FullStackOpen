import React, { useState } from 'react'

const Button = ({label, clickEvent}) => {
  return (
    <>
      <button onClick={clickEvent}>{label}</button>
    </>
  )
}

const Statistic = ({text, value}) => {
  return (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  )
}

const Stats = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if (all <= 0) {
    return (
      <div>
        No feedback given.
      </div>
    )
  }

  return (
    <>
      <table>
        <Statistic text='good' value={good}/>
        <Statistic text='neutral' value={neutral}/>
        <Statistic text='bad' value={bad}/>
        <Statistic text='all' value={all}/>
        <Statistic text='average' value={(good - bad) / all}/>
        <Statistic text='positive' value={(good / all) * 100 + '%'}/>
      </table>
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
