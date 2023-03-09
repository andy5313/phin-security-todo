import React, { useState } from "react";
import "./TodoItem.scss";

function TodoItem({ todo, onEdit, onDelete, onToggleComplete, viewDate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(todo);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditChange = (event) => {
    setUpdatedTodo({
      ...updatedTodo,
      description: event.target.value,
    });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedTodo(todo);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onEdit(updatedTodo);
  };

  return (
    <li>
      {isEditing ? (
        <div className="ListItemContainer">
          <div className="DescriptionDiv">
            <input
              value={updatedTodo.description}
              onChange={handleEditChange}
            />
          </div>
          <div className="BtnDiv">
            <button className="SaveBtn" onClick={handleSaveClick}>
              Save
            </button>
            <button className="CancelBtn" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="ListItemContainer">
          <div className="DescriptionDiv">
            {viewDate && (
              <div>{new Date(todo.created_on).toLocaleString()}</div>
            )}
            <input
              type="checkbox"
              id="checkbox"
              name="checkbox"
              checked={todo.isCompleted}
              onClick={() => onToggleComplete(todo)}
            />

            <span
              style={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              <label htmlFor="checkbox">{todo.description}</label>
            </span>
          </div>

          <div className="BtnDiv">
            <button className="EditBtn" onClick={handleEditClick}>
              Edit
            </button>
            <button className="DeleteBtn" onClick={() => onDelete(todo.id)}>
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
