
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
    
    return (
        <div>
            <h1>Users</h1>
            <table>
                <tbody>
                    {users.map(user => <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default Users