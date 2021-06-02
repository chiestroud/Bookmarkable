import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarText,
  Button
} from 'reactstrap';
import { signInUser, signOutUser } from '../helpers/auth';

const NavBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link className='navbar-brand' to="/">Bookmarkable</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
            {user
              && <Nav className="mr-auto" navbar>
              <NavItem>
                <Link className='nav-link' to="/open-space">Open Space</Link>
              </NavItem>
              <NavItem>
                <Link className='nav-link' to="/personal">Personal</Link>
              </NavItem>
              <NavbarText>
                <Button color='danger' onClick={signOutUser}>Log Out</Button>
            </NavbarText>
            </Nav>
            }
          {user && <NavbarText>Welcome, <span>{user.displayName}</span><img src={user.photoURL}/></NavbarText>}
          {!user && <Button color='info' onClick={signInUser}>Sign In</Button>}
        </Collapse>
      </Navbar>
    </div>
  );
};

NavBar.propTypes = {
  user: PropTypes.any
};

export default NavBar;
