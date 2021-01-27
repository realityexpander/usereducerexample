import React, { useReducer, useState, useEffect } from 'react'

const ACTIONS = {
  ADD_TODO: 'add-todo',
  COMPLETE_TODO: 'complete-todo'
}

function reducer( todos, action ) {
  console.log({todos}, {action})
  switch (action.eventType) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)]
      break;
    case ACTIONS.COMPLETE_TODO:
      return toggleTodo(todos, action.payload.indexToToggle)
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

function toggleTodo(todos, indexToToggle) {
  indexToToggle = parseInt(indexToToggle)
  let newTodos = todos.map( (todo, index) => {
    if (index === indexToToggle) {
      todo = {...todo}
      todo.complete = !todo.complete
    }
    return todo
  })

  return newTodos
}

function App() {
  const [todos, dispatch] = useReducer( reducer, [])
  const [nameState, setNameState] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    // Type CO # -> where # is the index of the todo you want to toggle
    if (nameState.includes("CO")) {
      let indexToToggle = nameState.split(' ')[1]
      dispatch({ eventType: ACTIONS.COMPLETE_TODO, payload: {indexToToggle : indexToToggle} })
      setNameState('')
    } else {
      dispatch({ eventType: ACTIONS.ADD_TODO, payload: {name: nameState} })
      setNameState('')
    }

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
    </>
  );
}

export default App;
