import React, { useReducer, useState } from 'react'

const ACTIONS = {
  ADD_TODO: 'add-todo'
}

function reducer( todos, action ) {
  console.log({todos}, {action})
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)]
    default:
      return [todos]
  }
}


function newTodo(name) {
  return { 
    id: Date.now(),
    name: name,
    completed: false
  }
}

function App() {
  const [todos, dispatch] = useReducer( reducer, [])
  const [nameX, setNameX] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: ACTIONS.ADD_TODO, payload: {name: nameX} })
    setNameX('')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" 
               value={nameX} 
               onChange={e => setNameX(e.target.value)} />
      </form>
    </>
  );
}

export default App;
