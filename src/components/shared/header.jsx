import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { ContactsContext } from "../../context/contacts.context";
import { PostsContext } from "../../context/posts.context";
import Post from "../../pages/post/post";
import {useNavigate} from "react-router-dom";

const Header = () => {
 // const contactsContext = useContext(ContactsContext);
  // const { logout } = contactsContext;
 // const { logout } =PostsContext;

  const logout = () => {
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("user");
    navigate("/login");
  };
  const navigate = useNavigate();

  return (
    <Navbar bg="primary" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/home">Contact</Navbar.Brand>
        <Navbar.Brand href="/post">My Post</Navbar.Brand>
        <Navbar.Brand href="/postList">PostList</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Button onClick={logout} variant="link" className="text-light">
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
