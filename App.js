import { Route, Routes } from "react-router-dom";
import Tasks from "./Components/Tasks/Tasks"
import MainTask from "./Components/MainTask/MainTask";
import { useState } from "react";
import AllListOfTasks from "./Components/AllListOfTasks/AllListOfTasks";
import About from "./Components/About/About";

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <div>
      <Routes>
        <Route
          path="/tasks"
          element={<Tasks tasks={tasks} setTasks={setTasks} />}
        />
        <Route path="/tasks/:id" element={<MainTask tasks={tasks} setTasks={setTasks}/>} />
        <Route
          path="/tasks/all"
          element={
            <AllListOfTasks tasks={tasks} setTasks={setTasks}></AllListOfTasks>
          }
        ></Route>
        <Route path="/tasks/about" element={<About></About>}></Route>
      </Routes>
    </div>
  );
}

export default App;
