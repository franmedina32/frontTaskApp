import React, { useState } from 'react'
import { endpoints } from '../resources/endpoints'

const NewUser = () => {
  const [userData, setUserData] = useState({})
  const [validUser, setValidUser] = useState(false)
  const handleSignUp = (e) => {
    e.preventDefault()
    fetch(endpoints.createUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
     .then(res => {
      res.json()
      if(res.ok){
        setValidUser(true)
      }
    })
    
  }
  return (
    <div>
      <h3>CREATE AN ACCOUNT TO ACCESS NINJA TASKAPP</h3>
      <form action="submit" onSubmit={handleSignUp}>
        <div>
          <input type="text" placeholder='username' onChange={(e)=> {setUserData({...userData, name: e.target.value})}}/>
        </div>
        <div>
          <input type="password" placeholder='password' onChange={(e)=> {setUserData({...userData, password: e.target.value})}}/>
        </div>
        <div>
          <button>Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default NewUser