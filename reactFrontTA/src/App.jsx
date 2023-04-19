import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import NewTask from './components/NewTask'
import Roomname from './components/Roomname'
import Rooms from './components/Rooms'
import Signup from './components/Signup'
import Task from './components/Task'
import User from './components/User'

function App() {
  

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={Login}/>
        <Route path='/newTask' element={NewTask}/>
        <Route path='/RoomName' element={Roomname}/>
        <Route path='/Rooms' element={Rooms}/>
        <Route path='/signup' element={Signup}/>
        <Route path='/task' element={Task}/>
        <Route path='/user' element={User}/>
      </Routes>
    </div>
  )
}

export default App
