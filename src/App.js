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
    case ACTIONS.COMPLETE_TODO:
      return completeTodo(todos, action.payload.indexToComplete)
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

function completeTodo(todos, indexToComplete) {
  indexToComplete = parseInt(indexToComplete)
  const newTodos = todos.map( (todo, index) => {
     if (index === indexToComplete) {
       todo.completed = true
       return todo
     } else {
       return todo
     }
  })

  return newTodos
}

function App() {
  const [todos, dispatch] = useReducer( reducer, [])
  const [nameState, setNameState] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (nameState.includes("COMP")) {
      let indexToComplete = nameState.split(' ')[1]
      dispatch({ eventType: ACTIONS.COMPLETE_TODO, payload: {indexToComplete: indexToComplete} })
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
