import React, { useEffect, useState } from 'react'
import { endpoints } from '../resources/endpoints'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'
import Task from './Task'

const User = () => {
  const [name, setName] = useState({})
  const [userData, setUserData] = useState(false)
  const [pendingIds, setPendingIds] = useState(false)
  const [doneIds, setDoneIds] = useState(false)
  const handleUserSearch = (e) => {
    e.preventDefault()
    fetch(endpoints.getUserByName, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(name)
    })
     .then(res => res.json())
     .then(data => setUserData(data))
  }
  useEffect(()=>{
    if(userData){
      const pendingTaskList = document.querySelector('#pendingTasks')
      const pendingTitle = document.createElement('h1')
      pendingTitle.innerHTML= `to do list for  ${userData.name}`
      pendingTaskList.appendChild(pendingTitle)
      const doneList = document.querySelector('#doneTasks')
      const doneTitle = document.createElement('h2')
      doneTitle.innerHTML = `congrats ${userData.name} you've already done: `
      doneList.appendChild(doneTitle)
      const pendingArray = []
      const doneArray = []
      userData.tasks.forEach(task => {
        if(task.taskState === "PENDING"){
          //setPendingTasks({...pendingTasks, task})
          /*const taskDiv = document.createElement('div')
          const name = document.createElement('label')
          const box = document.createElement('input')
          box.setAttribute('type', 'checkbox')
          box.setAttribute('id', `${task.id}`)
          const date = document.createElement('p')
          //const points = document.createElement('h4')
          name.innerHTML = `${task.name} points: ${task.points}`
          date.innerHTML = `${new Date(task.dateTime)}`
          //points.innerHTML = `${task.points}`
          taskDiv.appendChild(box)
          taskDiv.appendChild(name)
          taskDiv.appendChild(date)
          //taskDiv.appendChild(points)
          pendingTaskList.appendChild(taskDiv)*/
          pendingArray.push(task.id)
        }
        else if(task.taskState === "DONE"){
          //setDoneTasks({...doneTasks, task})
          /*const taskDiv = document.createElement('div')
          const name = document.createElement('h3')
          name.innerHTML = `✅ ${task.name}`
          taskDiv.appendChild(name)
          doneList.appendChild(taskDiv)*/
          doneArray.push(task.id)
        }
      })
      setPendingIds(pendingArray)
      setDoneIds(doneArray)
    }
    //const pendingTaskList = document.querySelector('#pendingTasks')
    //pendingTasks.forEach(task)
  },[userData])


  return (
    <div>
      <div>
        <form action="submit" onSubmit={handleUserSearch}>
          <input type="text" placeholder='search users' onChange={(e)=>{setName({...name, name: e.target.value})}}/>
          <button>🔍</button>
        </form>
      </div>
      <div>
        {userData ? 
        <div>
          <h2>{userData.name} - score: {userData.score}</h2>
          <div id='pendingTasks'>
            {pendingIds ? pendingIds.map(id => <Task id={id}/>) :
            <p>no pending tasks found</p>
            }
          </div>
          <div id='doneTasks'>
            {doneIds ? doneIds.map(id => <Task id={id}/>) : 
            <p>no done tasks found</p>
            }
          </div>
        </div>
        : <p></p>
        }
      </div>
    </div>
  )
}

export default User