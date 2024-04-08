import React from 'react'
import './Navigation.css'
import { Navbar,Container,Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authAction } from '../../Store/AuthSlice';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Navigation = () => {
 const dispatch = useDispatch()
 const history = useHistory()

 const logoutHandler=()=>{
   dispatch(authAction.logout())
   history.replace('/signup')
 }

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand style={{fontSize:'2rem'}}>MAILBOX</Navbar.Brand>
          <Nav className="me-auto" style={{marginLeft:'75%',gap:'2rem',Color:'whitesmoke'}}>
            <Link to="/home" className="nav-link">
              HOME
            </Link>
            <Link to="/mail/inbox" className="nav-link">
              MAIL
            </Link>
            <Link to="/signup" className="nav-link" onClick={logoutHandler}>
              LOGOUT
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation