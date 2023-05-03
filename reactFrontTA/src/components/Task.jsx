import React, { useEffect, useState } from 'react'
import { endpoints } from '../resources/endpoints'

const Task = ({id}) => {
  const[taskData, setTaskData] = useState(false)
  const [taskState, setTaskState] = useState()
  useEffect(()=> {
    fetch(endpoints.getTaskId+id)
     .then(res => res.json())
     .then(data => {
      setTaskData(data)
      setTaskState(data.taskState)
    })
     .catch(err => console.log(err))
  },[])

  const handleClick = (e) => {
    e.preventDefault()
    const url = endpoints.setTaskDone+id
    fetch(url,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
    })
     .then(res => {
      res.json()
      setTaskState("DONE")
    })
  }

  return (
    <div>
      {
      taskData && taskState === "PENDING" ?
      <div>
        <input type="checkbox" onClick={handleClick}/>
        <h4>{taskData.name} score: {taskData.points}</h4>
        <p>{taskData.dateTime}</p>
        <p>{taskData.taskState}</p>
      </div>
      : taskData && taskState === "DONE" ? 
      <div>
        <h4>✅ {taskData.name}</h4>
        <p>already done</p>
      </div>
      : <p>loading task...</p>
      }
    </div>
  )
}

export default Task