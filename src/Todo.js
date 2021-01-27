import React from 'react'
import { ACTIONS } from './App'

export default function Todo(props) {
  const {
    todo, 
    dispatch
  } = props

  return (
    <div>
      <span style={{ color: todo.complete ? '#CCC' : '#000', textDecorationLine: todo.complete ? 'line-through' : "" }} >
      {todo.name}
      </span>
      <button onClick={
          () => dispatch({ eventType: ACTIONS.TOGGLE_TODO, payload: {id: todo.id} })
        }
      >Toggle</button>
      <button color='red'>Delete</button>
    </div>
  )
}
