import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('testing blog', () => {
    let container, like, remove

    beforeEach(() => {
        const blog = {
            title: 'The newest achievements in testing',
            author: 'Conal Clarke',
            url: 'www.fine.com',
            likes: 5,
            user: {
                name: 'Testuser',
                id: 1,
            },
        }

        const user = {
            id: 1,
        }

        like = jest.fn()
        remove = jest.fn()

        container = render(
            <Blog
                blog={blog}
                user={user}
                handleUpdateBlog={like}
                handleRemoveBlog={remove}
            />
        ).container
    })

    test('renders a blog entry with title and author', () => {
        const title = container.querySelector('.blogName')
        const author = container.querySelector('.blog-author')
        expect(title).toBeDefined()
        expect(title).toHaveTextContent('The newest achievements in testing')
        expect(author).toHaveTextContent('Conal Clarke')
    })

    test('blog entry shows also URL, likes and username, when opened', async () => {
        const button = screen.getByText('show')
        const user = userEvent.setup()

        await user.click(button)
        const url = container.querySelector('.blog-url')
        const likes = container.querySelector('.blog-likes')
        const bloguser = container.querySelector('.blog-username')

        expect(url).toBeDefined()
        expect(url).toHaveTextContent('www.fine.com')
        expect(likes).toHaveTextContent('likes: 5')
        expect(bloguser).toHaveTextContent('Testuser')
    })

    test('like can be clicked two times', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('like')

        await user.click(button)
        await user.click(button)

        expect(like.mock.calls).toHaveLength(2)
    })
})
