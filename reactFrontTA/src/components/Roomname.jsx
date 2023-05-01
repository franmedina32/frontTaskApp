import React, { useEffect, useState } from 'react'
import { endpoints } from '../resources/endpoints'
import NewTask from './NewTask'



const Roomname = ({roomName}) => {

  const url = endpoints.getRoomName+roomName
  const [roomData, setRoomData] = useState()
  const [newT, setNewT] = useState(false)
  
  useEffect(()=>{
    fetch(url)
     .then(res => res.json())
     .then(data => {setRoomData(data)})
  },[])

  useEffect(()=>{
    if(roomData!=undefined){
      const contDiv = document.querySelector('#room')
      contDiv.innerHTML = " "
      roomData.users.forEach(userIter => {
        const uName = document.createElement('h3')
        uName.setAttribute('id',`${userIter.name}`)
        const uScore = document.createElement('h3')
        const uTasks = document.createElement('div')
        uName.innerHTML = `${userIter.name}`
        uScore.innerHTML = `score: ${userIter.score}`
        if (userIter.tasks[0] != undefined){
          userIter.tasks.forEach(task => {
            const item = document.createElement('li')
            item.innerHTML = `task: ${task.name} state: ${task.taskState}`
            uTasks.appendChild(item)
          })} else {
          const message = document.createElement('p')
          message.innerHTML = `no tasks assigned to ${userIter.name}`
          uTasks.appendChild(message)
        }
        contDiv.appendChild(uName)
        contDiv.appendChild(uScore)
        contDiv.appendChild(uTasks)

      });

    }

  })

  const handleNewTask = (e) => {
    e.preventDefault()
    setNewT(true)
    setRoomData(undefined)
  }

  return (
    <div>{ newT ? <NewTask roomBackName={roomName}/> : 
      <div>
        <h1>room: {roomName}</h1>
        <div id='room'></div>
        <div>
          <button onClick={handleNewTask}>new task</button>
        </div>
      </div>}
    </div>
  )
}

export default Roomname