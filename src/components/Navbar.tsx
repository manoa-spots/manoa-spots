'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { ComponentIDs } from '@/utilities/ids';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const currentUser = session?.user?.email;
  const menuStyle = { marginBottom: '0px' };

  // Remove the dynamic background class since we're using our custom styling
  return (
    <Navbar expand="lg" style={menuStyle}>
      <Container>
        <Navbar.Brand href="/" className="align-items-center">
          <span style={{ fontWeight: 800, fontSize: '24px' }}>
            <Image 
              src="/images/logo.png" 
              width={50} 
              style={{ marginBottom: 3 }} 
              alt="spots" 
            />
            spots
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={ComponentIDs.basicNavbarNav} />
        <Navbar.Collapse id={ComponentIDs.basicNavbarNav}>
          <Nav className="me-auto justify-content-start">
            {currentUser && (
              <Nav.Link 
                id={ComponentIDs.homeMenuItem} 
                active={pathname === '/home'} 
                href="/home"
              >
                home
              </Nav.Link>
            )}
            <Nav.Link
              id={ComponentIDs.profilesMenuItem}
              active={pathname === '/home'}
              href="/home"
            >
              home
            </Nav.Link>
            <Nav.Link
              id={ComponentIDs.projectsMenuItem}
              active={pathname === '/map'}
              href="/map"
            >
              map
            </Nav.Link>
            <Nav.Link
              id={ComponentIDs.interestsMenuItem}
              active={pathname === '/search'}
              href="/search"
            >
              search
            </Nav.Link>
            {currentUser && (
              <>
                <Nav.Link
                  id={ComponentIDs.addProjectMenuItem}
                  active={pathname === '/addProject'}
                  href="/addProject"
                >
                  home
                </Nav.Link>
                <Nav.Link
                  id={ComponentIDs.filterMenuItem}
                  active={pathname === '/filter'}
                  href="/filter"
                >
                  map
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser ? (
              <NavDropdown 
                id={ComponentIDs.currentUserDropdown} 
                title={currentUser}
              >
                <NavDropdown.Item 
                  id={ComponentIDs.currentUserDropdownSignOut} 
                  href="/auth/signout"
                >
                  <BoxArrowRight />
                  {' '}
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id={ComponentIDs.loginDropdown} title="Login">
                <NavDropdown.Item 
                  id={ComponentIDs.loginDropdownSignIn} 
                  href="/auth/signin"
                >
                  <PersonFill />
                  {' '}
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item 
                  id={ComponentIDs.loginDropdownSignUp} 
                  href="/auth/signup"
                >
                  <PersonPlusFill />
                  {' '}
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
