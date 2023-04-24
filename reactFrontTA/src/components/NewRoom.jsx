import React, { useEffect, useState } from 'react'
import { endpoints } from '../resources/endpoints'
const NewRoom = () => {
    const [userList, setUserList] = useState([])
    const [userInputs, setUserInputs] = useState([])
    const [roomName, setRoomName] = useState("")
    const[roomSetting, setRoomSettings] = useState({})

    useEffect(()=>{
        fetch(endpoints.listUsers)
         .then(res => res.json())
         .then(data => setUserList(data))
         .catch(err => console.log(err))
    },[])

    const handleSelectClick = (e) => {
        e.preventDefault()
        const userOptions = document.querySelector('#userOptions')
        userOptions.innerHTML = ""
        userList.map(user => {
            const option = document.createElement('input')
            option.setAttribute('type', 'checkbox')
            option.setAttribute('value', `${user.name}`)
            option.setAttribute('id', `${user.id}`)
            const label = document.createElement('label')
            label.setAttribute('for', `${user.id}`)
            label.innerHTML = `${user.name}`
            label.appendChild(option)
            userOptions.appendChild(label)
        });
    }

    const handleRoomCreation = (e) => {
        e.preventDefault()
        const selectedUsers = (Array.from(document.querySelectorAll('input[type="checkbox"]:checked')))
        selectedUsers.map(user => {setUserInputs(userInputs => [...userInputs, parseInt(user.id)])})
        setRoomSettings({
            name: roomName,
            users: [
                {}
            ]
        })
        fetch(endpoints.createRoom, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify()
            })
         .then(res => res.json())
         .then(data => console.log(data))
    } 


  return (
    <div>
        <div>
            <form>
                <h1>NEW ROOM</h1>
                <div>
                    <label>NAME</label>
                    <input id="roomName" type='string' placeholder='insert room name' onChange={(e) => setRoomName(e.target.value)}></input>
                </div>
                <div>
                    <label>add user</label>
                    <button  onClick={handleSelectClick}>＋</button>
                    <div id='userOptions'></div>
                </div>
                <div>
                    <button onClick={handleRoomCreation}>CREATE ROOM</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default NewRoom