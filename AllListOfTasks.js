import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AllListOfTasks.module.css";
import Form from "../Form/Form"

export default function AllListOfTasks({ tasks, setTasks }) {
  const [canEdit, setCanEdit] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedTime, setEditedTime] = useState("");
  const [editedIndex, setEditedIndex] = useState(-1);
  const [editedDescription, setEditedDescription] = useState(tasks.desc);

  const navigate = useNavigate();

  const handleOnChangeTask = (e) => {
    setEditedText(e.target.value);
  };

  const handleOnChangeDate = (e) => {
    setEditedDate(e.target.value);
  };

  const handleOnChangeDescription = (e) => {
    setEditedDescription(e.target.value);
  };

  const handleOnChangeTime = (e) => {
    setEditedTime(e.target.value);
  };

  const handleBack = () => {
    navigate("/tasks");
  };

  const handleEdit = (index) => {
    setCanEdit(!canEdit);
    setEditedIndex(index);
    setEditedText(tasks[index].text);
    setEditedDate(tasks[index].date);
    setEditedTime(tasks[index].time);
    setEditedDescription(tasks[index].desc);
  };

  const handleSubmit = (e, id, index) => {
    e.preventDefault();

    const taskToUpdate = tasks[index];
    if (editedText && editedDate && editedTime && editedDescription) {
        const updatedTask = {
          ...taskToUpdate,
          id: id,
          text: editedText,
          date: editedDate,
          time: editedTime,
          desc: editedDescription,
          checked: tasks[index].checked,
        };
        const updatedTasks = [...tasks];
        updatedTasks[index] = updatedTask;
        setTasks(updatedTasks);
        setEditedIndex(-1);
        setEditedText("");
        setEditedDate("");
        setEditedTime("");
        setEditedDescription("");
        setCanEdit(false);
    }
  };

  return (
    <main>
      <div>
        {tasks.length ? (
          <div className={styles.outerContainer}>
            <ol style={{ listStyle: "none", paddingLeft: "0" }}>
              {tasks.map((task, index) => (
                <li key={index}>
                  <div>
                    <div className={styles.container}>
                      <button
                        className={styles.myBackButton}
                        onClick={handleBack}
                      >
                        Back
                      </button>
                      <button
                        className={styles.myEditButton}
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <h1 style={{ paddingLeft: "30px" }}>{task.text}</h1>
                      <p style={{ paddingLeft: "30px" }}>{task.desc}</p>
                      <p style={{ paddingLeft: "30px" }}>
                        {task.date} {task.time}
                      </p>

                      <br></br>
                      <br></br>
                      {editedIndex === index && canEdit && (
                        <form onSubmit={(e) => handleSubmit(e, task.id, index)}>
                          <Form
                            task={editedText}
                            handleOnChangeTask={handleOnChangeTask}
                            myDate={editedDate}
                            handleOnChangeDate={handleOnChangeDate}
                            myTime={editedTime}
                            handleOnChangeTime={handleOnChangeTime}
                            description={editedDescription}
                            handleOnChangeDescription={
                              handleOnChangeDescription
                            }
                          ></Form>
                          <br></br>
                          <button
                            type="submit"
                            className={styles.myUpdateButton}
                          >
                            Update
                          </button>
                          <br></br>
                          <br></br>
                        </form>
                      )}
                    </div>
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
