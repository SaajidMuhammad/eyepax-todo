import React, { useEffect, useState } from "react";
import "./Menu.css";
import axios from "axios";

const Menu = ({ setIsLogged }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allTodoList, setAllTodoList] = useState([]);
  const [selectedTodoId, setSelectedTodoId] = useState("");

  useEffect(() => {
    getTodoList();
  }, []);

  const getTodoList = async () => {
    setIsLoading(true);

    const todoList = await axios.get(
      `https://jsonplaceholder.typicode.com/todos`
    );

    console.log(todoList.data, "todoList.data");

    setAllTodoList(todoList.data);
    setIsLoading(false);
  };

  return (
    <div>
      <div className="navbar">
        <div className="todo-header">List of TODOs</div>

        <button
          onClick={() => {
            setIsLogged(false);
            setAllTodoList([]);
            setSelectedTodoId();
          }}
        >
          Logout
        </button>
      </div>

      <div className="todos-wrapper">
        {isLoading ? (
          <div className="todo-card"> Loading..... </div>
        ) : (
          <>
            {allTodoList?.map((singleTodo) => {
              return (
                <div className="todo-card" key={singleTodo.id}>
                  <div className="todo-text">Goign to KAndy</div>

                  {singleTodo.completed ? (
                    <div className="todo-status-complete">Completed</div>
                  ) : (
                    <div className="todo-status-not-complete">
                      Not Completed
                    </div>
                  )}
                </div>
              );
            })}

            {/* <div className="todo-card">
              <div className="todo-text">Goign to KAndy</div>
        
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
