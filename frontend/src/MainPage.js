import React from 'react'
import TaskMenu from './components/TaskMenu'
import TaskPanel from './components/TaskPanel'
import WaterMark from './components/WaterMark'

const MainPage = () => {
  return (
    <>
     <h1>Task Manager Application</h1>
     <TaskMenu />
     <TaskPanel />
     <WaterMark />
    </>
  )
}

export default MainPage