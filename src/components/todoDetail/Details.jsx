import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Details.css";

const Details = ({ todoId }) => {
  const [todoDetail, setTodoDetail] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getTodoDetail();
    return () => {
      setTodoDetail({});
      setDataLoaded(false);
    };
  }, []);

  const getTodoDetail = async () => {
    const todoDetail = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`
    );

    setTodoDetail(todoDetail.data);
    setDataLoaded(true);
  };

  return (
    <div className="detail-wrapper">
      {dataLoaded ? (
        <>
          <div className="detail-title-card">{todoDetail?.title}</div>

          <div className="detail-footer">
            {todoDetail.completed ? (
              <div className="todo-status-complete">Completed</div>
            ) : (
              <div className="todo-status-not-complete">Not Completed</div>
            )}

            <div className="user-id-card">User ID : {todoDetail?.userId}</div>
          </div>
        </>
      ) : (
        <div className="detail-title-card"> Loading.......... </div>
      )}
    </div>
  );
};

export default Details;
