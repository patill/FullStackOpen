import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

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
        <div className="toggle">
            <div className="toggle" style={hideWhenVisible}>
                <button
                    className="button is-primary"
                    onClick={toggleVisibility}
                >
                    {props.buttonLabel}
                </button>
            </div>
            <div className="toggle" style={showWhenVisible}>
                <button className="button is-danger" onClick={toggleVisibility}>
                    close <span className="delete"></span>
                </button>
                {props.children}
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
