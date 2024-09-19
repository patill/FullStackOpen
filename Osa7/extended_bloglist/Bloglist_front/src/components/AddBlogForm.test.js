import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AddBlogForm from './AddBlogForm'

test('AddBlogform calls onSubmit and contains correct input field contents', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    render(<AddBlogForm saveBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('Blog title')
    const authorInput = screen.getByPlaceholderText('Blog author')
    const urlInput = screen.getByPlaceholderText('Blog url')
    const button = screen.getByText('Send')
    //screen.debug(button);

    await user.type(titleInput, 'The newest creation of diversity in clouds')
    await user.type(authorInput, 'David Millgrave')
    await user.type(urlInput, 'https://this-blog-is-special.io')
    await user.click(button)

    //console.log(createBlog.mock.calls);
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe(
        'The newest creation of diversity in clouds'
    )
    expect(createBlog.mock.calls[0][0].author).toBe('David Millgrave')
    expect(createBlog.mock.calls[0][0].url).toBe(
        'https://this-blog-is-special.io'
    )
})
