import React, { useState } from 'react'

const Button = ({label, event}) => {
  return (
    <div>
      <button onClick={event}>{label}</button>
    </div>
  )
}

const randomNumber = (lowerBound, upperBound) => {
  return Math.floor(Math.random() * (upperBound - lowerBound) + lowerBound)
}

const determineWinner = (anecdotes, points) => {
  const len_anecdotes = anecdotes.length - 1
  var winner = {points: points[0], message: anecdotes[0]}
  for (let i = 0; i < len_anecdotes; i++) {
    if (winner.points < points[i]) {
      winner = {points: points[i], message: anecdotes[i]}
    }
  }
  return winner
}

const Winner = ({anecdotes, points}) => {
  const winner = determineWinner(anecdotes, points)
  return (
    <>
      <h3>Current Winner: </h3>
      <p>{winner.message}</p>
      <p>with {winner.points} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]



  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({0: 0, 1: 0, 2: 0, 3:0, 4:0, 5:0, 6: 0})

  const incrementVotes = (index) => {
    const copyPoints = {... points}
    copyPoints[index]+= 1
    setPoints(copyPoints)
  }


  return (
    <div>
      <h3>Anecdote of the Day:</h3>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <Button label="Vote" event={() => {incrementVotes(selected)}} />
      <Button label="Next Anecdote" event={() => {setSelected(randomNumber(0, anecdotes.length - 1))}}/>
      <Winner anecdotes={anecdotes} points={points}/>
    </div>
  )
}

export default App
