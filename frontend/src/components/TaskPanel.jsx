import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import Task from './Task';

const TaskPanel = () => {
  const [tasks, setTasks] = useState([]);
  const [, updateState] = useState();

  const fetchTasks = async () => {
    await axios.get(process.env.REACT_APP_TODOLIST_ENDPOINT).then(res => {
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
  };

const forceUpdate = useCallback(() => updateState({}), []);

  function sortByCreationDate () {setTasks(tasks.sort((prev, next) => {
    return Date.parse(next.createdAt) - Date.parse(prev.createdAt)
  }))
  forceUpdate();
};
  
  function sortByTitle () {
    const sortedTask = tasks.sort((prev, next) => {
      const nameA = prev.title.toUpperCase();
      const nameB = next.title.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    })
    setTasks(sortedTask);
  forceUpdate();
};

  function sortByStatus () {
    const sortedTask = tasks.sort((prev, next) => {
      const nameA = prev.status.toUpperCase();
      const nameB = next.status.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    })
    setTasks(sortedTask);
  forceUpdate();
};

  return (
    <div>
      <div>
        <button onClick={ sortByTitle }>Sort By Title</button>
        <button onClick={ sortByCreationDate }>Sort By Creation Date</button>
        <button onClick={ sortByStatus }>Sort By Status</button>
      </div>
      {tasks.length > 0 ? (renderTasks()) : ("No tasks")}
    </div>
  )
}

export default TaskPanel