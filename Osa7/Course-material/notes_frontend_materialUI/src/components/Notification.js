import { Alert } from '@mui/material'
const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div >
            <Alert severity="success">{message}</Alert>
        </div>
    )
}

export default Notification
