import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './Nav.css';
import {UserContext} from '../UserContext'

const Nav = () => {

  const [userName, setUserName] = useContext(UserContext);

  return (
    <nav className="nav">
      <div className="logo">
        <Link to='/'>
          <h4>Logo</h4> 
        </Link>
      </div>
      <div className="name">
      <h4 id='user'>{userName}</h4>
      </div>
    </nav>
  )
}

export default Nav;