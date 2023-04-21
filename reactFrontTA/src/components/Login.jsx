import React, { useEffect, useState } from 'react'
import Signup from './Signup'
import { Link } from 'react-router-dom'
import { endpoints } from '../resources/endpoints'
import Rooms from './Rooms'

const Login = () => {
    const [userData, setUserData] = useState({
        name: "",
        password: ""
    })

    const [val, setVal] = useState(false)


    const handleLogin = (e) => {
        e.preventDefault()
        console.log(userData)
        fetch(endpoints.loginUser, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
         .then(res => {
            if (res.ok){
                setVal(true)
                return res.json()
            }
            else {
                setVal(false)
            }
         })
         .then(dat => console.log(dat))
    }

  return (
    <div>
        { val ? (<Rooms props = {userData}/>) : (
        <div>
            <h1>LOGIN TO TASK APP ORGANIZER</h1>
            <form>
                <div>
                    <label>USERNAME:</label>
                    <input type='text' placeholder='username' onChange={(e) => setUserData({...userData, name: e.target.value})}></input>
                </div>
                <div>
                    <label>PASSWORD</label>
                    <input type='password' placeholder='password' onChange={(e) => setUserData({...userData, password: e.target.value})}></input>
                </div>
                <div>
                    <button type='submit' onClick={handleLogin}>LOGIN</button>
                </div>
            </form>
            <div>
                <Link to="/signup"><h3>SIGN UP!</h3></Link>
            </div>
        </div>)}
    </div>
  )
}

export default Login