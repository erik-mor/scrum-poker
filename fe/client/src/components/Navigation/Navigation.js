import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Navigation = () => {
  const [userName] = useContext(UserContext);

  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="/">Scrum-poker-king</Navbar.Brand>
      <Nav className="mr-auto"></Nav>
      <Nav>
        <Nav.Item> {userName} </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
