import React, { useState } from 'react'
import Login from './Login'
import { endpoints } from '../resources/endpoints'
import Rooms from './Rooms'
import { Link } from 'react-router-dom'

const Signup = () => {

    const [userData,setUserData] = useState({
        name: "" ,
        password: ""
    })

    const [val, setVal] = useState(false)

    const validate = (obj) => {
        if (obj.name.length > 5 && obj.password.length > 5){
            setVal(true)
        }
        else{
            setVal(false)
        }
    }

    

    const handleRegister = (e) => {
        e.preventDefault()
            fetch(endpoints.createUser, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })
             .then(res => res.json())
             .then(data => {
                console.log(data)
                validate(data)
            })
             .catch(err => console.log(err))
    }



  return (
    <div>
        { val ? ( <Rooms/> ) : ( 
        <div>
            <h1>SIGNUP TO TASK APP ORGANIZER</h1>
            <form>
                <div>
                    <label>USERNAME:</label>
                    <input id='username'  placeholder='username' onChange={(e) => setUserData({...userData, name: e.target.value})}></input>
                </div>
                <div>
                    <label>PASSWORD</label>
                    <input id='password1' type='password' placeholder='password' onChange={(e) => setUserData({...userData, password: e.target.value})}></input>
                </div>
                <div>
                    <button onClick={handleRegister} type='submit'>REGISTER</button>
                </div>
            </form>
        </div> )}
    </div>
  )
}

export default Signup