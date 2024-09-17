import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Button } from '@mui/material'

const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/">
                    home
                </Button>

                <Button color="inherit" component={Link} to="/About">
                    about
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
