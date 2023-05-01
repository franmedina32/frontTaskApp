import React from 'react'
import { Link, Outlet, Route} from 'react-router-dom'
import { Navbar, Container,NavDropdown,Nav } from 'react-bootstrap'
import NewRoom from './NewRoom'
import Roomname from './Roomname'
import NewUser from './NewUser'
import User from './User'
import NewTask from './NewTask'
import Task from './Task'



const NavbarComp = () => {
  return (
    <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">TASK APP</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="ROOMS" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/newRoom">New Room</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/Roomname">Find Room</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="USERS" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/newUser">New User</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/user">Find User</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="TASKS" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/newTask">New Task</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/findtask">Find Task</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      <Outlet/>
    </>
  )
}

export default NavbarComp
