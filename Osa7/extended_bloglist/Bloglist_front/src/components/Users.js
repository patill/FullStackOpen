import userService from '../services/users'
import { useSelector } from 'react-redux'

const User = ({ user }) => {
    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
        </tr>
    )
}

const Users = () => {
    const users = useSelector((state) => state.users)
    console.log(users)
    return (
        <div>
            <h1>User page</h1>
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
