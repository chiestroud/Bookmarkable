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
import { NavLinkStyle, NavStyle } from '../styles/NavBarStyle';

const NavBar = ({ user, admin }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.warn(admin);

  return (
    <NavStyle>
      <Navbar expand="md">
        <Link className='navbar-brand' to="/"><i className="fas fa-book-open mr-2"></i>Bookmarkable</Link>
        <NavbarToggler
          onClick={() => setIsOpen(isOpen ? false : 'isOpen')}>{isOpen ? <i id="close" className="far fa-window-close"></i> : <i className="fas fa-hamburger"></i>}</NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
            {user
            && <Nav className="mr-auto" navbar>
              <NavLinkStyle>
              <NavItem>
                <Link className='nav-link' to="/open-space">Open Space</Link>
              </NavItem>
              <NavItem>
                <Link className='nav-link' to="/personal">Personal</Link>
              </NavItem>
              {admin
                && <NavItem>
                  <Link className='nav-link' to="/admin">Admin</Link>
                </NavItem>
              }
              </NavLinkStyle>
              <NavbarText>
                <Button color='danger' onClick={signOutUser}>Log Out</Button>
            </NavbarText>
            </Nav>
            }
          {user
            ? <NavbarText className='welcomeText'>Welcome, <span className='displayName mr-2'>{user.displayName}</span><img className='profileImage' src={user.photoURL} /></NavbarText>
            : <NavbarText><Button color='warning' onClick={signInUser}>Sign In</Button></NavbarText>}
        </Collapse>
      </Navbar>
    </NavStyle>
  );
};

NavBar.propTypes = {
  user: PropTypes.any,
  admin: PropTypes.any
};

export default NavBar;
