import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Task from './Task';

const TaskPanel = () => {
  const [tasks, setTasks] = useState([{
    id: 1,
    title: "My first activity",
    date: "06/06/2022",
    time: "12:00",
    details: "A very important activity that will change my life",
    status: "in progress",
    creationAt: "06/06/2022",
  },
  {
    id: 2,
    title: "My second activity",
    date: "07/06/2022",
    time: "13:00",
    details: "An important activity that will change my life too",
    status: "pending",
    createdAt: "06/06/2022",
  }]);

  const fetchTasks = async () => {
    await axios.get('https://backend-portfolio-arthur.herokuapp.com/messager').then(res => {
    if (res.status === 200) {
      // setTasks(res.data);
    }
  })
    .catch(err => console.log(err));
  }
  useEffect(() => {
    fetchTasks();
  }, []);

  function renderTasks() {
    return tasks.map((task) => (
      <Task task={ task } key={ `task${task.id}` } />
    ))
  }

  return (
    <div>
      {tasks.length < 1 ? ("No tasks") : (
        renderTasks()
      )}
    </div>
  )
}

export default TaskPanel