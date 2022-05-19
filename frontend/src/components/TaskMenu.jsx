import axios from 'axios';
import React, { useState } from 'react';

const TaskMenu = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [taskCreated, setTaskCreated] = useState(false);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState('');

  function handleAddNewTaskButton () {
    setIsEnabled(!isEnabled);
  }

  function handleTimeChange ({target}) {
    setTime(target.value);
  }

  function handleDateChange ({target}) {
    setDate(target.value);
  }

  function handleTitleChange ({target}) {
    setTitle(target.value);
  }

  function handleDetailsChange ({target}) {
    setDetails(target.value);
  }

  function handleStatusChange ({target}) {
    setStatus(target.value);
  }

  async function handleCreateTaskButton () {
    await axios.post('', { time, date, title, details, status })
      .then(res => {
        if (res.status === 201) {
          setTaskCreated(true);
          setTimeout(() => setTaskCreated(false), 3000);
        }
      })
      .catch(err => console.log(err));
  }

    return (
    <div data-testid="taskMenu">
      <button aria-label='add new task' onClick={ handleAddNewTaskButton }>Add Task</button>
      {isEnabled &&
      <>
        <input type="date" name="date" data-testid='date' onChange={ handleDateChange } />
        <input type="time" name="time" data-testid='time' onChange={ handleTimeChange } />
        <input type="text" name='title' data-testid='title' placeholder='Title' onChange={ handleTitleChange } />
        <input type="text" name="details" data-testid='details' placeholder='Details' onChange={ handleDetailsChange } />
        <label for="status">Status:</label>
        <select id="status" data-testid='progress' onChange={ handleStatusChange }>
          <option value="pending">pending</option>
          <option value="in progress">in progress</option>
          <option value="done">done</option>
        </select>
        <button aria-label='create task' onClick={ handleCreateTaskButton }>create task</button>
      </>
      }
      <p>{date} - {time} - {title} - {details} - Status: {status}</p>
      {taskCreated && <p>task created</p>}
    </div>
  )
}

export default TaskMenu