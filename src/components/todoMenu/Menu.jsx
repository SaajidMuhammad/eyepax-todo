import React, { useEffect, useState } from "react";
import "./Menu.css";
import axios from "axios";
import Modal from "react-modal";

import Details from "../todoDetail/Details";

import "./Menu.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const Menu = ({ setIsLogged }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allTodoList, setAllTodoList] = useState([]);
  const [selectedTodoId, setSelectedTodoId] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [currentPageList, setCurrentPageList] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [paginationPoint, setPaginationPoint] = useState(1);
  const [generatedPagination, setGeneratedPagination] = useState([]);

  const [startSlice, setStartSlice] = useState(0);
  const [endSlice, setEndSlice] = useState(8);

  // let subtitle;

  useEffect(() => {
    getTodoList();
  }, []);

  useEffect(() => {
    generatePagination();
  }, [allTodoList, paginationPoint]);

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

    if (paginationPoint < maxPages) {
      let paginationsArray = [];

      for (let i = paginationPoint; i < paginationPoint + 10; i++) {
        paginationsArray.push(i);
      }

      setGeneratedPagination(paginationsArray);
    }
  };

  const getSelectedPageData = () => {
    let newEndSlice = selectedPage * 8;
    let newStartSlice = newEndSlice - 8;

    setEndSlice(newEndSlice);
    setStartSlice(newStartSlice);

    setCurrentPageList(allTodoList.slice(newStartSlice, newEndSlice));
  };

  // Modal Functions
  const openModal = () => {
    setModalIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const logout = () => {
    sessionStorage.clear();

    setIsLogged(false);
    setAllTodoList([]);
    setSelectedTodoId();
    setEndSlice(8);
    setStartSlice(0);
    setModalIsOpen(false);
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
                <div
                  className="todo-card"
                  key={singleTodo.id}
                  onClick={() => {
                    setSelectedTodoId(singleTodo.id);
                    openModal();
                  }}
                >
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
              setPaginationPoint(1);
            }}
          >
            &#8676;
          </div>
          <div
            className="page-button"
            onClick={() => {
              if (paginationPoint !== 1) {
                setPaginationPoint(paginationPoint - 1);
              }
            }}
          >
            &#8592;
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
              let maxPages = Math.ceil(allTodoList.length / 8) - 9;
              if (maxPages > paginationPoint) {
                setPaginationPoint(paginationPoint + 1);
              }
            }}
          >
            &#8594;
          </div>
          <div
            className="page-button"
            onClick={() => {
              let lastPages = Math.ceil(allTodoList.length / 8) - 9;
              setPaginationPoint(lastPages);
            }}
          >
            &#8677;
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Todo Details"
        >
          {modalIsOpen && <Details todoId={selectedTodoId} />}
        </Modal>
      </div>
    </div>
  );
};

export default Menu;
