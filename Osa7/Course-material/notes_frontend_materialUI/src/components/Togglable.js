import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Button = styled.button`
    background: Bisque;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid Chocolate;
    border-radius: 3px;
`

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return { toggleVisibility }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible} className="togglableContent">
                {props.children}
                <Button onClick={toggleVisibility}>cancel</Button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
