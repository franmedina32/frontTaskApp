import React, { useEffect, useState } from 'react'
import { endpoints } from '../resources/endpoints'
import UserTasks from './UserTasks'



const Roomname = ({roomName}) => {

  const url = endpoints.getRoomName+roomName
  const [roomData, setRoomData] = useState()
  
  useEffect(()=>{
    fetch(url)
     .then(res => res.json())
     .then(data => {setRoomData(data)})
  },[])

  useEffect(()=>{
    if(roomData!=undefined){
      const contDiv = document.querySelector('#room')
      contDiv.innerHTML = ''
      roomData.users.forEach(userIter => {
        const uName = document.createElement('h3')
        const uScore = document.createElement('h3')
        const uTasks = document.createElement('p')
        //const uTasks = <UserTasks id={userIter.id}/>
        uName.innerHTML = `${userIter.name}`
        uScore.innerHTML = `score: ${userIter.score}`
        uTasks.innerHTML = 'user tasks →'
        uTasks.setAttribute('id', `${userIter.id}`)
        contDiv.appendChild(uName)
        contDiv.appendChild(uScore)
        contDiv.appendChild(uTasks)
      });
    }
  })

  return (
    <div>
      <h1>room: {roomName}</h1>
      <div id='room'></div>
    </div>
  )
}

export default Roomname