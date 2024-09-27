import { useSelector, useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

const User = () => {
    const dispatch = useDispatch()
    const match = useMatch('/users/:id')
    const users = useSelector((state) => state.users)
    const user = match
        ? users.find((user) => user.id === match.params.id)
        : null

    console.log(user)
    if (!user) {
        dispatch(
            setNotification(
                {
                    notification: 'The user does not exist',
                    class: 'error',
                },
                5
            )
        )
        return (
            <div>
                <Notification />
                <p>There is no user</p>
            </div>
        )
    }
    return (
        <div className="content">
            <h1>{user.name}</h1>
            <h2>Added blogs</h2>
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog._id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default User
