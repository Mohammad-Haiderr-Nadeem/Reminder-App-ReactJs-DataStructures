import React, { useState } from "react";
import styles from "./Tasks.module.css";
import ListOfTasks from "../ListOfTasks/ListOfTasks";
import { Link } from "react-router-dom";
import Form from "../Form/Form";

export default function Tasks({ tasks, setTasks }) {
  const [task, setTask] = useState("");
  const [myDate, setMyDate] = useState("");
  const [myTime, setMyTime] = useState("");
  const [description, setDescription] = useState("");
  const [taskOpen, setTaskOpen] = useState(true);
  const [isReminderSet, setIsReminderSet] = useState(false);
  const [index, setIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task, myDate, myTime, description, isReminderSet);
  };

  const addTask = (task, myDate, myTime, description, isReminderSet) => {
    if (task && myDate && myTime && description) {
      const data = {
        id: index,
        text: task,
        date: myDate,
        time: myTime,
        desc: description,
        checked: isReminderSet,
      };
      setTasks([...tasks, data]);
      setTask("");
      setMyDate("");
      setDescription("");
      setMyTime("");
      setIsReminderSet(false);
      setIndex(index + 1);
      console.log('tasks: ',tasks);
    }
  };

  const handleOnChangeTask = (e) => {
    setTask(e.target.value);
  };

  const handleOnChangeDate = (e) => {
    setMyDate(e.target.value);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((item) => item.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleToggle = () => {
    setTaskOpen(!taskOpen);
  };

  const handleReminderChange = () => {
    setIsReminderSet(!isReminderSet);
  };

  const handleOnChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleOnChangeTime = (e) => {
    setMyTime(e.target.value);
  };

  return (
    <main>
      {console.log('task', tasks)}
      <div className={styles.container}>
        <span style={{ fontWeight: "bold", fontSize: "40px", color: "black" }}>
          Task Tracker
          {taskOpen ? (
            <button
              onClick={handleToggle}
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "5px",
                width: "90px",
                marginLeft: "5%",
              }}
            >
              Open
            </button>
          ) : (
            <button
              onClick={handleToggle}
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "5px",
                width: "90px",
                marginLeft: "5%",
              }}
            >
              Close
            </button>
          )}
        </span>

        {taskOpen && (
          <div>
            <br></br>
            <br></br>
            <form onSubmit={handleSubmit}>
              <Form
                task={task}
                handleOnChangeTask={handleOnChangeTask}
                myDate={myDate}
                handleOnChangeDate={handleOnChangeDate}
                myTime={myTime}
                handleOnChangeTime={handleOnChangeTime}
                description={description}
                handleOnChangeDescription={handleOnChangeDescription}
              ></Form>
              <br></br>
              <br></br>
              <label htmlFor="reminder" style={{ marginRight: "40%" }}>
                Set Reminder
              </label>
              <input type="checkbox" onChange={handleReminderChange} />
              <br></br>
              <button type="submit" className={styles.mySubmitButton}>
                Save Task
              </button>
              <br></br>
            </form>
          </div>
        )}
        <ListOfTasks
          tasks={tasks}
          deleteTask={deleteTask}
          isReminderSet={isReminderSet}
        ></ListOfTasks>
        <Link to="/tasks/about">
          <p style={{ textAlign: "center", color: "blue", fontWeight: "bold" }}>
            About
          </p>
        </Link>
      </div>
    </main>
  );
}
