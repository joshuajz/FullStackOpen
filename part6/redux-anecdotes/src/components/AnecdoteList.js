import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state).sort(
    (a, b) => b.votes - a.votes
  )
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(increaseVote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => {
        return (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>has {anecdote.votes}</div>
            <button
              onClick={() => {
                vote(anecdote.id)
              }}
            >
              vote
            </button>
          </div>
        )
      })}
    </div>
  )
}
export default AnecdoteList
