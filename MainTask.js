import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./MainTask.module.css";
import Form from "../Form/Form";

export default function MainTask({ tasks, setTasks }) {
  const { id } = useParams();
  console.log('id', id);
  console.log('tasks', tasks);
  const [task, setTask] = useState([]);
  const [canEdit, setCanEdit] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedTime, setEditedTime] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = (taskId) => {
      setTask(tasks[taskId]);
    };

    fetchTask(id);
  }, [tasks, task, id,]);

  if (!task) {
    return <div>Task not found</div>;
  }

  const handleBack = () => {
    navigate("/tasks");
  };

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

  const handleEdit = () => {
    setCanEdit(!canEdit);
    if (!editedText) {
      setEditedText(task.text);
    }
    if (!editedDate) {
      setEditedDate(task.date);
    }
    if (!editedTime) {
      setEditedTime(task.time);
    }
    if (!editedDescription) {
      setEditedDescription(task.desc);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskToUpdate = tasks[id];
    if (editedText && editedDate && editedTime && editedDescription) {
        const updatedTask = {
          ...taskToUpdate,
          id: id,
          text: editedText,
          date: editedDate,
          time: editedTime,
          desc: editedDescription,
          checked: tasks[id].checked,
        };
        const updatedTasks = [...tasks];
        updatedTasks[id] = updatedTask;
        setTasks(updatedTasks);
        setEditedText("");
        setEditedDate("");
        setEditedTime("");
        setEditedDescription("");
        setCanEdit(false);
    }
  };

  return (
    <main>
      <div className={styles.outerContainer}>
        <div className={styles.container}>
          <button className={styles.myBackButton} onClick={handleBack}>
            Back
          </button>
          <h1 style={{ paddingLeft: "30px" }}>{task.text}</h1>
          <p style={{ paddingLeft: "30px" }}>{task.desc}</p>
          <p style={{ paddingLeft: "30px" }}>
            {task.date} {task.time}
          </p>
          <button className={styles.myEditButton} onClick={handleEdit}>
            Edit
          </button>
          <br></br>
          <br></br>
          {canEdit && (
            <form onSubmit={(e) => handleSubmit(e)}>
              <Form
                task={editedText}
                handleOnChangeTask={handleOnChangeTask}
                myDate={editedDate}
                handleOnChangeDate={handleOnChangeDate}
                myTime={editedTime}
                handleOnChangeTime={handleOnChangeTime}
                description={editedDescription}
                handleOnChangeDescription={handleOnChangeDescription}
              ></Form>
              <br></br>
              <button type="submit" className={styles.myUpdateButton}>
                Update
              </button>
              <br></br>
              <br></br>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
