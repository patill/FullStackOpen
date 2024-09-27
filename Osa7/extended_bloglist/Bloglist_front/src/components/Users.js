import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
    return (
        <tr>
            <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
        </tr>
    )
}

const Users = () => {
    const users = useSelector((state) => state.users)
    console.log(users)
    return (
        <div>
            <h1 className="title is-1">User page</h1>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td>
                            <strong>blogs created</strong>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <User key={user.id} user={user} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users
