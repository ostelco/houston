import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import { authActions } from '../actions/auth.actions';
import './App.css';

function LoggedInMenu(props) {
  const { isOpen, logout } = props;

  function handleLogout(event) {
    event.preventDefault();
    logout();
  }

  return (
    <Collapse isOpen={isOpen} navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} href="/" to="/">
            Search
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} href="" to="/" onClick={handleLogout}>
            Logout
          </NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  );
}

function App(props) {
  const [isOpen, setIsOpen] = useState(false);
  const { loggedIn, user, login, logout } = props;

  const userName = user ? user.name + ' : ' + user.email : '';
  const loggedInMenu = loggedIn ? (
    <LoggedInMenu isOpen={isOpen} logout={logout} />
  ) : null;
  const loggedOutButton = loggedIn ? null : (
    <Button color="outline-primary" onClick={login}>
      Log In
    </Button>
  );

  return (
    <div>
      <Navbar light expand="md">
        <NavbarBrand>
          <img
            src="redotter.png"
            alt="Red Otter"
            style={{ width: 60, height: 60, marginTop: -10 }}
          />
        </NavbarBrand>
        <Nav>
          <NavItem>{userName}</NavItem>
        </Nav>
        {loggedOutButton}
        {loggedInMenu}
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      </Navbar>
    </div>
  );
}

function mapStateToProps(state) {
  const { loggedIn, user } = state.authentication;
  return {
    loggedIn,
    user
  };
}
const mapDispatchToProps = {
  login: authActions.loginRequest,
  logout: authActions.logout
};

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default connectedApp;
