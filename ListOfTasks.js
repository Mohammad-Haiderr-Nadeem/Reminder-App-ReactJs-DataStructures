import React from "react";
import styles from "./ListOfTasks.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ListOfTasks(props) {
  const navigate = useNavigate();

  const handleToggleShowAllTasks = () => {
    navigate("/tasks/all");
  };

  // const handleDoubleClick = async (
  //   id,
  //   sameText,
  //   sameDate,
  //   sameTime,
  //   sameDescription
  // ) => {
  //   try {
  //     await axios.put(`http://localhost:4000/myTasks/${id}`, {
  //       id: id,
  //       date: sameDate,
  //       time: sameTime,
  //       text: sameText,
  //       desc: sameDescription,
  //       checked: false,
  //     });
  //   } catch (error) {
  //     console.error("Error updating checked state:", error);
  //   }
  // };

  const handleOnClickHeading = (e, id) => {
    console.log('id', id);
    navigate(`/tasks/${id}`);
  };

  return (
    <main>
      <div>
        {props.tasks.length ? (
          <div>
            <br></br>
            <button
              className={styles.myToggleButton}
              onClick={handleToggleShowAllTasks}
            >
              View More
            </button>
            <ol
              style={{
                listStyleType: "none",
                marginLeft: "0",
                paddingLeft: "0",
              }}
            >
              {props.tasks.slice(0, 2).map((task, index) => (
                <li key={index}>
                  <div
                    className={`${styles.container} ${
                      task.checked ? styles["reminder-set"] : ""
                    }`}
                    // onDoubleClick={(e) =>
                    //   handleDoubleClick(
                    //     task.id,
                    //     task.text,
                    //     task.date,
                    //     task.time,
                    //     task.desc
                    //   )
                    // }
                  >
                    <div className={styles["reminder-corner"]} />
                    <span>
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: "30px",
                        }}
                        onClick={(e) => handleOnClickHeading(e, task.id)}
                      >
                        {task.text}
                      </span>
                      <button
                        style={{
                          color: "red",
                          backgroundColor: "beige",
                          border: "none",
                          fontWeight: "bold",
                          fontSize: "20px",
                          position: "absolute",
                          top: "0",
                          right: "0",
                        }}
                        onClick={() => props.deleteTask(task.id)}
                      >
                        X
                      </button>
                    </span>
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                      onClick={(e) => handleOnClickHeading(e, task.id)}
                    >
                      {task.date} {task.time}
                    </p>
                  </div>
                  <br />
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </main>
  );
}
