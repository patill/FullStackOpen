import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { forwardRef } from 'react'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const AddBlogForm = forwardRef((props, ref) => {
    const dispatch = useDispatch()
    //TODO use custom useState field for field cleaning

    const handleBlogChange = (event) => {
        setBlog(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const postBlog = (event) => {
        event.preventDefault()
        const content = {
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value,
        }
        dispatch(addBlog(content))
        ref.current.toggleVisibility()
        //addBlog({ title: blog, author, url })
        // setBlog('')
        // setAuthor('')
        // setUrl('')
    }

    return (
        <div>
            <h2 className="title is-3">post a new blog</h2>
            <form onSubmit={postBlog}>
                <div>
                    Blog
                    <input
                        className="input"
                        type="text"
                        //value={blog}
                        name="title"
                        placeholder="Blog title"
                        //onChange={handleBlogChange}
                    />
                </div>
                <div>
                    Author
                    <input
                        type="text"
                        //value={author}
                        className="input"
                        name="author"
                        placeholder="Blog author"
                        //onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    Url
                    <input
                        type="text"
                        className="input"
                        //value={url}
                        name="url"
                        placeholder="Blog url"
                        //onChange={handleUrlChange}
                    />
                </div>
                <div className="block">
                    <button
                        className="button is-primary send-button"
                        type="submit"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    )
})

export default AddBlogForm
