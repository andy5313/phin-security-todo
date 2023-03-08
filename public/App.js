import React, { useState, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState(null);

  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/api/todos");
    const json = await response.json();
    setTodos(json);
  };

  const displayList = () => {
    if (todos) {
      return todos.map((todo) => {
        return <div key={todo.id}>{todo.description}</div>;
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
    <div>
      <h1>Todo List!</h1>
      {displayList()}
    </div>
  );
};

export default App;
