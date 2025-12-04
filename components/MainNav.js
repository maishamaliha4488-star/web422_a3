import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { readToken, removeToken } from "@/lib/authenticate";
import { useRouter } from "next/router";

export default function MainNav() {
  const router = useRouter();
  const token = readToken();

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <Navbar expand="lg" className="navbar-dark bg-primary">
      <Container>
        <Navbar.Brand as={Link} href="/">
          Maisha Maliha Nava
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/about">
              About
            </Nav.Link>
          </Nav>

          {token ? (
            <Nav className="ms-auto">
              <NavDropdown title={token.userName} id="menu">
                <NavDropdown.Item as={Link} href="/favourites">
                  Favourites
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <Nav.Link as={Link} href="/register">
                Register
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
