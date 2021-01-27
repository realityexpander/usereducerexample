import React, { useReducer, useState, useEffect } from 'react'
import Todo from './Todo.js'

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo'
}

function reducer( todos, action ) {
  console.log({todos}, {action})
  switch (action.eventType) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)]
      break;
    case ACTIONS.TOGGLE_TODO:
      return todos.map( todo => {
        if (todo.id === action.payload.id) {
          return {...todo, complete: !todo.complete}
        }
        return todo
      })
      break;
    default:
      return [todos]
  }
}

function newTodo(name) {
  return { 
    id: Date.now(),
    name: name,
    complete: false
  }
}

function App() {
  const [todos, dispatch] = useReducer( reducer, [])
  const [nameState, setNameState] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ eventType: ACTIONS.ADD_TODO, payload: {name: nameState} })
    setNameState('')
  }

  function handleToggle(e) {
    e.preventDefault()
    console.log(e)
    dispatch({ eventType: ACTIONS.TOGGLE_TODO, payload: {id: id}})
  }

  useEffect( () => {
    const todoAnchor = document.querySelector('#todos')
    let text = ""
    for(let todo of todos) {
      text = text + JSON.stringify(todo) +"\n"
    }
    todoAnchor.innerText = text
    return () => {}
  }, [todos]) 

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" 
               value={nameState} 
               onChange={e => setNameState(e.target.value)} />
      </form>
      {todos.map( todo => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch} />
      })}
    </>
  );
}

export default App;
