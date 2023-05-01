import React, { useEffect, useState } from 'react'
import { endpoints } from '../resources/endpoints'

const Task = ({id}) => {
  const[taskData, setTaskData] = useState(false)
  useEffect(()=> {
    fetch(endpoints.getTaskId+id)
     .then(res => res.json())
     .then(data => setTaskData(data))
     .catch(err => console.log(err))
  },[])
  return (
    <div>
      {
      taskData ? 
      <div>
        <p>{taskData.name}</p>
        <p>{taskData.points}</p>
        <p>{taskData. dateTime}</p>
        <p>{taskData.taskState}</p>
      </div>
      : <p>loading task...</p>
      }
    </div>
  )
}

export default Task