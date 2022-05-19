import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Task = ({ task: { id, date, time, title, details, status, creationDate }}) => {
  return (
    <div>
      <div>
        <h3>{title}</h3>
        <p>{details}</p>
        <div>
          <p>{date}</p>
          <p>{time}</p>
        </div>
        <p>{status}</p>
        <p>{creationDate}</p>
      </div>
      <button>edit task</button>
      <button>delete task</button>
    </div>
  )
}

export default Task