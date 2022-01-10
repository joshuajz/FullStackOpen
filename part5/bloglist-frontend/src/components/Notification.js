import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const style = {
    background: 'lightgrey',
    color: 'red',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return <div style={style}>{message}</div>
}

export default Notification
