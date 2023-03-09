import React, { useState, useEffect } from "react";
import Form from "../client/components/Form/Form";
import TodoItem from "../client/components/TodoItem/TodoItem";
import "./App.scss";
import Header from "../client/components/Header/Header";

const App = () => {
  const [todos, setTodos] = useState(null);
  const [viewDate, setViewDate] = useState(false);

  const fetchData = async () => {
    console.log("fetching");
    const response = await fetch("http://localhost:3000/api/todos");
    const json = await response.json();
    setTodos(json);
  };

  const addTodo = async (todo) => {
    const currentTime = new Date().toISOString();

    try {
      const response = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      const createdTodo = await response.json();
      //setTodos([...todos, createdTodo]);
      setTodos((prevTodos) => [...prevTodos, createdTodo]);
      console.log("todos", todos);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodoItem = (id) => {
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete todo item");
        }
        // remove the deleted todo item from the list
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateTodoItem = (todo) => {
    fetch(`/api/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update todo item");
        }
        // replace the updated todo item in the list
        setTodos((prevTodos) => {
          const index = prevTodos.findIndex((t) => t.id === todo.id);
          const updatedTodos = [...prevTodos];
          updatedTodos[index] = todo;
          console.log("updated todos", updatedTodos[index]);
          return updatedTodos;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateCompletedTodo = (todo) => {
    fetch(`/api/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...todo,
        isCompleted: !todo.isCompleted,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update todo item");
        }
        // replace the updated todo item in the list
        setTodos((prevTodos) => {
          const index = prevTodos.findIndex((t) => t.id === todo.id);
          const updatedTodos = [...prevTodos];
          updatedTodos[index] = {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
          console.log("updated completed todo", updatedTodos[index]);
          return updatedTodos;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const hideItem = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const displayList = () => {
    if (todos) {
      return todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={updateTodoItem}
            onDelete={deleteTodoItem}
            onToggleComplete={updateCompletedTodo}
            viewDate={viewDate}
            onHide={hideItem}
          >
            {todo.description}
          </TodoItem>
        );
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!todos) {
    console.log(todos);
    return <div>Loading...</div>;
  }

  return (
    <div className="TodoContainer">
      <div className="TodoListContainer">
        <Form onAdd={addTodo}></Form>
        <Header></Header>
        <ul>{displayList()}</ul>
      </div>
    </div>
  );
};

export default App;
