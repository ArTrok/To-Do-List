import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Task from './Task';

const TaskPanel = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    await axios.get('https://backend-portfolio-arthur.herokuapp.com/messager').then(res => {
    if (res.status === 200) {
      setTasks(res.data);
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