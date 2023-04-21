import React, { useEffect, useState } from 'react'
import { endpoints } from '../resources/endpoints'
import Roomname from './Roomname'

const Rooms = (userData) => {

    const [name, setName] = useState({
        name: ""
    })
    const [settings,setSettings] = useState({
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: {}
    })
    
    const [roomsNames, setRoomsNames] = useState()

    useEffect(()=>{
        setName({
            name: userData.props.name 
        })
    },[])

    useEffect(()=>{
        setSettings({...settings, body: JSON.stringify(name)})
    },[name])



    const handleRoomsSearch = () => {
        fetch(endpoints.getRoomsByUserName,settings)
         .then(res => res.json())
         .then(data => {
            const roomName = data.map(room => room.name) 
            setRoomsNames(roomName)
         })
         .catch(err => console.log(err))
    }

    const [roomSelected, setRoomSelected] = useState(false)

    const handleRoomClick = (roomName) => {
        setRoomSelected(roomName)
    }

  return (
    <div>
        { roomSelected ? (<Roomname props = {roomSelected}/>) : (
        <div>
            <div id='roomsList'>
                <h3 onClick={handleRoomsSearch}>CURRENT ROOMS ▼</h3>
                <ul>
                    {roomsNames && roomsNames.map(roomName => (
                        <li key={roomName}>
                            <a href="#" onClick={() => handleRoomClick(roomName)}>{roomName}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <button>＋</button>
                <label>NEW ROOM</label>
            </div>
        </div>)}
    </div>
  )
}

export default Rooms