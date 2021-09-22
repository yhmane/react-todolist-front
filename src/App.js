import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";
import Input from "./components/input";
import Todo from "./components/todo";

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
      <Input handleSubmit={insertTodo} input={input} handleChange={changeText}/>

      {
        todos ? todos.map((todo) => {
          return (
            <Todo todo={todo} handleClick={() => updateTodo(todo.id)} handleDelete={() => deleteTodo(todo.id)} key={todo.id}/>
          )
        })
        : null
      }
    </div>
  );
}

export default App;
