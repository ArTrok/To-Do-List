import React, { useState } from 'react'

const TaskMenu = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

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

    return (
    <div data-testId="taskMenu">
      <button aria-label='add new task' onClick={ handleAddNewTaskButton }>Add Task</button>
      {isEnabled &&
      <>
        <input type="date" name="date" data-testId='date' onChange={ handleDateChange } />
        <input type="time" name="time" data-testId='time' onChange={ handleTimeChange } />
        <input type="text" name='title' data-testId='title' placeholder='Title' onChange={ handleTitleChange } />
        <input type="text" name="details" data-testId='details' placeholder='Details' onChange={ handleDetailsChange } />
      </>
      }
      <p>{date}  {time} - {title} - {details}</p>
    </div>
  )
}

export default TaskMenu