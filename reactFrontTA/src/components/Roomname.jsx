import React, { useEffect, useState } from 'react'
import { endpoints } from '../resources/endpoints'
import Task from './Task'

const Roomname = () => {
  const[searchName, setSearchName] = useState()
  const[roomData, setRoomData] = useState(false)
  const[taskIds, setTaskIds] = useState(false)
  const handleSearchClick = (e) => {
    e.preventDefault()
    fetch(endpoints.getRoomName+searchName)
     .then(res => res.json())
     .then(data => setRoomData(data))
     .catch(err => console.log(err))
  }

  useEffect(()=>{
    const userList = document.querySelector('#usersList')
    if(userList != null) {
      roomData.users.forEach(user => {
        const userDiv = document.createElement('div')
        const userNameScore = document.createElement('h4')
        userNameScore.innerHTML = `${user.name} - score: ${user.score}`
        userDiv.appendChild(userNameScore)
        userList.appendChild(userDiv)
      })
    const taskIds = roomData.users.flatMap((user) => user.tasks.map((task) => task.id))
    setTaskIds(taskIds)
    }
    else {
      console.log("data not retrieved")
    }
  },[roomData])

  /*useEffect(()=>{
    const tasksList = document.querySelector('#tasksList')
    roomData.users.forEach(user => {
      user.tasks.forEach(task => setTaskIds([...taskIds, task.id]))
    })
  },[roomData])*/

  return (
    <div>
      <form action="submit">
        <input type='text' placeholder='search room by name' onChange={(e)=> {setSearchName(e.target.value)}}></input>
        <button onClick={handleSearchClick}>🔍</button>
      </form>
      {roomData ? 
      <div>
        <h1>{roomData.name}</h1>
        <div>
          <h3>users</h3>
          <ul id='usersList'></ul>
        </div>
      </div> 
      : <p>search...</p>}
      {roomData ? 
      <div>
        <h3>tasks</h3>
          <div id='tasksList'>
            {taskIds ? taskIds.map(id => <Task id={id}/>) : 
            <p>loading each taska</p>
            }
          </div>
      </div>
      : <p>loading tasks...</p>
    }
    </div>
  )
}

export default Roomname