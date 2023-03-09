import React, { useState } from "react";
import "./Form.scss";

function Form({ onAdd }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = new Date().toISOString();
    const newTodo = {
      created_on: currentTime,
      description: inputValue,
      isCompleted: false,
    };
    onAdd(newTodo);
    setInputValue("");
    console.log("newTodo", newTodo);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   addTodo();
  // };

  // const addTodo = async () => {
  //   const currentTime = new Date().toISOString();

  //   try {
  //     const response = await fetch("http://localhost:3000/api/todos", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         created_on: currentTime,
  //         description: inputValue,
  //         isCompleted: false,
  //       }),
  //     });

  //     const createdTodo = await response.json();
  //     setInputValue("");
  //     console.log(createdTodo);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <form onSubmit={handleSubmit}>
      <div className="InputSubmitDiv">
        <label>
          <input
            className="InputTodo"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Add a new item..."
          />
        </label>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default Form;
