import { TableCell, TableRow } from '@mui/material'


const Note = ({ note, toggleImportance }) => {
    const label = note.important ? 'make not important' : 'make important'
    return (
        <TableRow key={note.id}>
            <TableCell className="note">
                <span>{note.content}</span>
                <button onClick={toggleImportance}>{label}</button>
            </TableCell>
            <TableCell>{note.user ? note.user.username : ''}</TableCell>
        </TableRow>
    )
}

export default Note
