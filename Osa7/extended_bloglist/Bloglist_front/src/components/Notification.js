import { useSelector } from 'react-redux'

const Notification = () => {
    const classname = useSelector((state) => state.notification.class)
    const message = useSelector((state) => state.notification.notification)

    console.log(message)
    if (message === undefined) {
        return null
    }

    return (
        <div>
            <div className={classname}>{message}</div>
        </div>
    )
}

export default Notification
