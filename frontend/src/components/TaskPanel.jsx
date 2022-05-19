import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TaskPanel = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const test = async () => {
      await axios.get('https://backend-portfolio-arthur.herokuapp.com/messager').then(res => {
      if (res.status === 200) {
        setTasks(res.data);
      }
    })
      .catch(err => console.log(err));
    }

    test();
  }, []);

  return (
    <div>
      {tasks.length < 1 ? ("No tasks") : (

      )}
    </div>
  )
}

export default TaskPanel