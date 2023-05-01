import React, { useState } from 'react'
import { endpoints } from '../resources/endpoints'
import { Link } from 'react-router-dom'
import Roomname from './Roomname'

const NewTask = ({roomName}) => {
  const[userName,setUserName] = useState({})
  const[userVal, setUserVal] = useState(false)
  const[newTask, setNewTask] = useState()
  const[backRoom,setBackRoom] = useState(false)
  
  const handleUserSet = (e) =>{
    e.preventDefault()
    fetch(endpoints.getUserByName,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userName)
    })
     .then(res => res.json())
     .then(data => {
      setNewTask({...NewTask, user_id : data.id})
      if(data != undefined){
        setUserVal(true)
      }
     })
  }

  const handleNewTask = (e) => {
    e.preventDefault()
    fetch(endpoints.createTask,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    })
     .then(res => res.json())
     .then(data => console.log(data))
  }

  const handleBackRoom = () => {
    setBackRoom(true)
  }

  return (
    <div>
      <form>
        <label>USER:</label>
        <input placeholder='user name' onChange={(e=>{setUserName({...userName, name: e.target.value})})}></input>
        <button onClick={handleUserSet}>SET</button>
      </form>
        {
        userVal ? 
        <div>
          <h2>new task</h2>
          <form>
            <div>
              <label>TASK NAME</label>
              <input type="text" onChange={(e)=>{setNewTask({...newTask, name: e.target.value})}}/>
            </div>
            <div>
              <label>POINTS</label>
              <input type='number' onChange={(e)=>{setNewTask({...newTask, points: e.target.value})}}/>
            </div>
            <div>
              <label>DATE & TIME</label>
              <input type='datetime-local' onChange={(e)=>{setNewTask({...newTask, dateTime: e.target.value})}}/>
            </div>
            <div>
              <label>TASK STATE</label>
              <select onChange={(e)=>{setNewTask({...newTask, taskState: e.target.value})}}>
                <option></option>
                <option>PENDING</option>
                <option>DONE</option>
              </select>
            </div>
            <div>
              <button onClick={handleNewTask}>CREATE</button>
            </div>
          </form>
        </div> : <p>SET A VALID USER</p>
        }
        <div>
          { backRoom ? <Link to={Roomname} roomName={roomName}/> : 
          <button onClick={handleBackRoom}>BACK TO ROOM</button>
          }
        </div>
    </div>
  )
}

export default NewTask

