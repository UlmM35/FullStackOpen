import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Button from "./Button"
import { Navbar, Nav } from "react-bootstrap"

const NavBar = () => {

    const user = useSelector(({ user }) => user)

    const padding = {
        padding: 5
    }
    
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#" as="span">
                <Link style={padding} to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link>
                <em>{user.name} logged in <Button text={'log out'}/></em>
            </Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}

export default NavBar