import React from 'react'
import NewAnecdote from '../src/components/NewAnecdote'
import AnecdoteList from '../src/components/AnecdoteList'

const App = () => {
  return (
    <div>
      <AnecdoteList />
      <NewAnecdote />
    </div>
  )
}

export default App
