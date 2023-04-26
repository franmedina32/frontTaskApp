import React, { useState } from 'react'
import { endpoints } from '../resources/endpoints'
import { Link } from 'react-router-dom'
import Roomname from './Roomname'

const NewTask = () => {

  const [newTask, setNewTask] = useState({})
  const[resShow, setResShow] = useState(false)
  const[responsible, setResponsible] = useState({})
  const[searchName,setSearchName] = useState('')
  const handleNewTask = (e) => {
    e.preventDefault()

    fetch(endpoints.createTask, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
    })
     .then(res => res.json())
     .then(data => {
      console.log(data)
      if(data.id != undefined){
        setResponsible({...responsible, name: data.name})
        setResShow(true)
      }
    })
  }


  const handleUserSet = (e) => {
    e.preventDefault()
    fetch(endpoints.getUserByName,{
      method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(searchName)
    })
     .then(res => res.json())
     .then(data => console.log(data))
  }


  return (
    <div>
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
        <div> { resShow ? 
          <form>
            <h3>SET USER</h3>
            <label>USER NAME</label>
            <input type='text' placeholder='username' onChange={(e)=>{setSearchName({name: e.target.value})}}></input>
            <button onClick={handleUserSet}>SET USER</button>
          </form> : null} 
        </div>
      </div>
    </div>
  )
}

export default NewTask