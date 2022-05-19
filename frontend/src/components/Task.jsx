import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Task = ({ task: { id, date, time, title, details, status, createdAt }}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [timeState, setTime] = useState('');
  const [dateState, setDate] = useState('');
  const [titleState, setTitle] = useState('');
  const [detailsState, setDetails] = useState('');
  const [statusState, setStatus] = useState('');

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

  async function handleUpdateTaskButton () {
    await axios.put('',
      { title: titleState, details: detailsState, date: dateState, time: timeState, status: statusState })
      .then(res => {
        if (res.status === 200) {

        }
      });
  }

  function editTaskButton () {
    setIsDisabled(!isDisabled);
  }

  function whatToRender() {
    return (
      isDisabled ? (
        <div>
          <h3>{title}</h3>
          <p>{details}</p>
          <div>
            <p>{date}</p>
            <p>{time}</p>
          </div>
          <p>{status}</p>
          <p>{createdAt}</p>
        </div>) : (
          <div>
            <input type="date" name="date" data-testId={ `taskDate${ id }` } placeholder={ date } onChange={ handleDateChange } />
            <input type="time" name="time" data-testId={ `taskTimestamp${ id }` } placeholder={ time } onChange={ handleTimeChange } />
            <input type="text" name='title' data-testId={ `taskTitle${ id }` } placeholder={ title } onChange={ handleTitleChange } />
            <input type="text" name="details" data-testId={ `taskDetail${ id }` } placeholder={ details } onChange={ handleDetailsChange } />
            <label for="status">Status:</label>
            <select id="status" data-testId={ `taskStatus${ id }` } placeholder={ status } onChange={ handleStatusChange }>
              <option value="pending">pending</option>
              <option value="in progress">in progress</option>
              <option value="done">done</option>
            </select>
            <button aria-label='update task' onClick={ handleUpdateTaskButton }>update task</button>
          </div>
        )
      
    )
  }

  return (
    <div>
      { whatToRender() }
      <button onClick={ editTaskButton }>edit task</button>
      <button>delete task</button>
    </div>
  )
}

export default Task