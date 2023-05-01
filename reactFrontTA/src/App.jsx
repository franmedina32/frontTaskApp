import { Route, Routes, Outlet } from 'react-router-dom'
import './App.css'
import NewTask from './components/NewTask'
import Roomname from './components/Roomname'
import Task from './components/Task'
import User from './components/User'
import NewRoom from './components/NewRoom'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/NavbarComp'
import NewUser from './components/NewUser'
import Home from './components/Home'

function App() {
  

  return (
    <div className="App">
      <NavbarComp/>
        <Routes>
            <Route path='/' element={<Home></Home>}/>
            <Route path='/newTask' element={<NewTask/>}/>
            <Route path='/RoomName' element={<Roomname/>}/>
            <Route path='/task' element={<Task/>}/>
            <Route path='/user' element={<User/>}/>
            <Route path='/newRoom' element={<NewRoom/>}/>
            <Route path='/newUser' element={<NewUser/>}/>
        </Routes>
    </div>
  )
}

export default App
