import React, { useState } from 'react'
import { endpoints } from '../resources/endpoints'
import Task from './Task'

const FindTask = () => {
    const [taskSearchName, setTaskSearchName] = useState({})
    const [taskData, setTaskData] = useState(false)
    const handleTaskSearch = () => {
        fetch(endpoints.getTaskByName,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskSearchName)
        })
         .then(res => res.json())
         .then(data => setTaskData(data))
    }
  return (
    <div>
        <input type='text' placeholder='insert task name' onChange={(e)=> {setTaskSearchName({...taskSearchName, name: e.target.value})}}></input>
        <button onClick={handleTaskSearch}>🔍</button>
        {taskData ? 
        <Task id={taskData.id}/> :
        <p>search a task</p>
    }
    </div>
  )
}

export default FindTask