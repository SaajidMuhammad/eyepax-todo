import React, { useEffect, useState } from "react";
import "./Menu.css";
import axios from "axios";

const Menu = ({ setIsLogged }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allTodoList, setAllTodoList] = useState([]);
  const [selectedTodoId, setSelectedTodoId] = useState("");

  const [currentPageList, setCurrentPageList] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [generatedPagination, setGeneratedPagination] = useState([]);

  const [startSlice, setStartSlice] = useState(0);
  const [endSlice, setEndSlice] = useState(8);

  useEffect(() => {
    getTodoList();
  }, []);

  useEffect(() => {
    generatePagination();
  }, [selectedPage, allTodoList]);

  useEffect(() => {
    getSelectedPageData();
  }, [selectedPage]);

  const getTodoList = async () => {
    setIsLoading(true);

    const todoList = await axios.get(
      `https://jsonplaceholder.typicode.com/todos`
    );

    setAllTodoList(todoList.data);
    setCurrentPageList(todoList.data.slice(startSlice, endSlice));
    setIsLoading(false);
  };

  const generatePagination = () => {
    let maxPages = Math.ceil(allTodoList.length / 8);

    if (selectedPage < maxPages) {
      let paginationsArray = [];

      for (let i = selectedPage; i < selectedPage + 10; i++) {
        paginationsArray.push(i);
      }

      setGeneratedPagination(paginationsArray);
    }
  };

  const getSelectedPageData = () => {
    if (selectedPage > 1) {
      setEndSlice(endSlice + 8);
      setStartSlice(endSlice - 8);
    }

    setCurrentPageList(allTodoList.slice(startSlice, endSlice));
  };

  const logout = () => {
    setIsLogged(false);
    setAllTodoList([]);
    setSelectedTodoId();
    setEndSlice(8);
    setStartSlice(0);
  };

  return (
    <div>
      <div className="navbar">
        <div className="todo-header">List of TODOs</div>

        <button
          onClick={() => {
            logout();
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
            {currentPageList?.map((singleTodo) => {
              return (
                <div className="todo-card" key={singleTodo.id}>
                  <div className="todo-text">{singleTodo.title}</div>

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
          </>
        )}
      </div>

      <div className="pagination-wrapper">
        <div className="page-buttons">
          <div
            className="page-button"
            onClick={() => {
              if (selectedPage !== 1) {
                setSelectedPage(selectedPage - 1);
              }
            }}
          >
            {" "}
            &#8592;{" "}
          </div>

          {generatedPagination.length > 1 &&
            generatedPagination.map((page) => {
              return (
                <div
                  className={`page-button`}
                  key={page}
                  style={
                    page === selectedPage
                      ? { background: "#4C4CFF", color: "white" }
                      : {}
                  }
                  onClick={() => {
                    setSelectedPage(page);
                  }}
                >
                  {page}
                </div>
              );
            })}

          <div
            className="page-button"
            onClick={() => {
              setSelectedPage(selectedPage + 1);
            }}
          >
            {" "}
            &#8594;{" "}
          </div>
        </div>

        {/* <div className="jump-to-wrapper">
          <input type="number" className="jump-to-input" placeholder="Page" />
          <div className="jump-to-button">Go</div>
        </div> */}
      </div>
    </div>
  );
};

export default Menu;
