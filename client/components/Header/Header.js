import React from "react";
import "./Header.scss";

function Header({ setViewDate, viewDate }) {
  return (
    <div className="HeaderDiv">
      <h1>Todo List!</h1>
      <button
        className="DateBtn"
        onClick={() => {
          console.log(viewDate);
          setViewDate(!viewDate);
        }}
      >
        View Date
      </button>
    </div>
  );
}

export default Header;
