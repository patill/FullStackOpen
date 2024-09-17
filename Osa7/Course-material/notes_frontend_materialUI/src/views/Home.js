import React from 'react'
import { useState, useEffect, useRef } from 'react'

import { Container, TableContainer, Paper, TableBody, Table } from '@mui/material'
import Note from '../components/Note'
import noteService from '../services/notes'
import loginService from '../services/login'
import Notification from '../components/Notification'
import Footer from '../components/Footer'
import LoginForm from '../components/LoginForm'
import Togglable from '../components/Togglable'
import NoteForm from '../components/NoteForm'

const Home = (props) => {
    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null) //error empty at beginning
    const [user, setUser] = useState(null)

    const noteFormRef = useRef()

    console.log(errorMessage)

    const updateHook = () => {
        console.log('effect')
        async function fetchData() {
            try {
                const data = await noteService.getAll()
                console.log(data)
                setNotes(data)
            } catch (error) {
                if (error.name === 'AxiosError') {
                    setErrorMessage(
                        'Notes were not retrieved, trying again later'
                    )
                } else setErrorMessage(error.toString())
            }
        }

        fetchData()
    }

    useEffect(updateHook, []) //empty array means it is run only the first time

    console.log('render', notes.length, 'notes')

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, [])

    const addNote = (noteObject) => {
        const sendData = async (noteObject) => {
            try {
                //Server generates id and sends the added object back
                const newObject = await noteService.create(noteObject)
                console.log('response', newObject)
                //Piilota lisäämislomake taas:
                noteFormRef.current.toggleVisibility()
                setNotes(notes.concat(newObject))

                //setErrorMessage(null);
            } catch (error) {
                console.log('error objekti', error)
                if (error.response) {
                    setErrorMessage(error.response.data.error)
                } else {
                    setErrorMessage(error.toString())
                }
                setTimeout(() => setErrorMessage(null), 5000)
            }
        }
        // .then -method:
        // axios.post("http://localhost:3001/notes", noteObject).then((response) => {
        //   setNotes(notes.concat(response.data));
        //   setNewNote("");
        // });

        sendData(noteObject)
    }

    const notesToShow = showAll ? notes : notes.filter((note) => note.important)

    const toggleImportanceOf = async (id) => {
        const note = notes.find((n) => n.id === id)
        try {
            const changedNote = { ...note, important: !note.important }
            const response = await noteService.update(id, changedNote)
            setNotes(notes.map((note) => (note.id !== id ? note : response)))
        } catch (e) {
            setErrorMessage(
                `Note '${note.content}' was already removed from server`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            setNotes(notes.filter((note) => note.id !== id))
        }
    }

    const login = async (userObj) => {
        try {
            console.log(userObj)
            const user = await loginService.login(userObj)
            window.localStorage.setItem(
                'loggedNoteappUser',
                JSON.stringify(user)
            )
            noteService.setToken(user.token)
            setUser(user)
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.error)
                setTimeout(() => setErrorMessage(null), 5000)
            } else setErrorMessage(error.toString())
        }
    }

    return (
        <Container>
            <h1>Notes</h1>
            <Notification className="error" message={errorMessage} />

            {user === null ? (
                <Togglable buttonLabel="Login">
                    <LoginForm login={login} />
                </Togglable>
            ) : (
                <div>
                    <p>{user.username} logged in.</p>
                    <Togglable buttonLabel="New note" ref={noteFormRef}>
                        <NoteForm createNote={addNote} />
                    </Togglable>
                </div>
            )}
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    {notesToShow.map((note) => (
                        <Note
                            key={note.id}
                            note={note}
                            toggleImportance={() => toggleImportanceOf(note.id)}
                        />
                    ))}
                </TableBody>
            </Table>
            </TableContainer>

            <Footer />
        </Container>
    )
}

export default Home
