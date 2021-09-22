import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";

function App() {
  const domain = "http://localhost:8080"
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    await axios
      .get(domain + "/todo")
      .then((response) => {
        console.log(response.data)
        setTodos(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function insertTodo(e) {
    e.preventDefault();

    const insertTodo = async () => {
      await axios
              .post(domain + "/todo", {
                todoName: input
              })
              .then((response) => {
                setInput("")
                setTodos([...todos, response.data]);
              })
              .catch((error) => {
                console.error(error)
              })
    }
    insertTodo();
  }

  function updateTodo(id) {
    const updateTodo = async () => {
      await axios
              .put(domain + "/todo/" + id, {})
              .then((response) => {
                setTodos(
                  todos.map((todo) => 
                    todo.id === id ? { ...todo, completed: !todo.completed} : todo
                  )
                )
              })
              .catch((error) => {
                console.error(error)
              })
    }
    updateTodo();
  }

  function deleteTodo(id) {
    const deleteTodo = async () => {
      await axios
              .delete(domain + "/todo/" + id)
              .then((response) => {
                setTodos(
                  todos.filter((todo) => todo.id !== id)
                )
              })
              .catch((error) => {
                console.error(error)
              })
    }
    deleteTodo()
  }

  function changeText(e) {
    e.preventDefault();
    setInput(e.target.value)
  }

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <form onSubmit={insertTodo}>
        <label>
        Todo &nbsp;
        <input type="text" required={true} value={input} onChange={changeText}/>
        </label>
        <input type="submit" value="CREATE"/>
      </form>

      {
        todos ? todos.map((todo) => {
          return (
            <div className="todo" key={todo.id}>
              <h3>
                <label
                  className = {todo.completed ? "completed" : null}
                  onClick={() => updateTodo(todo.id)}>
                  {todo.todoName}
                </label>
                <label onClick={() => deleteTodo(todo.id)}>
                  &nbsp;&nbsp;&nbsp;❌
                </label>
              </h3>
            </div>
          )
        })
        : null
      }
    </div>
  );
}

export default App;
