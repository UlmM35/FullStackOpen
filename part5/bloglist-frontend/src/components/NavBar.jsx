import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Button from "./Button"

const NavBar = () => {

    const user = useSelector(({ user }) => user)
    
    return (
      <div style={{backgroundColor: "gray", padding: 20}}>
        <Link style={{padding: 5}} to="/">blogs</Link>
        <Link style={{padding: 5}} to="/users">users</Link>
        {user.name} logged in <Button text={"log out"}/>
      </div>
    )
}

export default NavBar