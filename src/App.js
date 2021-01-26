import React, { useReducer, useState, useEffect } from 'react'

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
  const [nameState, setNameState] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: ACTIONS.ADD_TODO, payload: {name: nameState} })
    setNameState('')
  }

  useEffect( () => {
    const todoAnchor = document.querySelector('#todos')
    let text = ""
    for(let todo of todos) {
      text = text + JSON.stringify(todo) +"\n"
    }
    todoAnchor.innerText = text

  }, [todos]) 

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" 
               value={nameState} 
               onChange={e => setNameState(e.target.value)} />
      </form>
    </>
  );
}

export default App;
