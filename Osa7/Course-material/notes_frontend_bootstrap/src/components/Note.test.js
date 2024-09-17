import React from 'react'
//import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const { container } = render(<Note note={note} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()

  const div = container.querySelector('.note')
  expect(div).toHaveTextContent(    'Component testing is done with react-testing-library'  )

  //screen.debug()

  //screen.debug(div)//tulosta vain pieni osa html:stä
  //screen.debug(div)
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = jest.fn()

  render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const user = userEvent.setup() // aloittaa uuden session
  const button = screen.getByText('make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

//queryByText voidaan käyttää, jos halutaan, että ei tule virhettä, jos löydettävää elementtiä ei löydy.
test('renders no shit', () => {
  const note = {
    content: 'This is a reminder',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.queryByText('do not want this shit to be rendered')
  expect(element).toBeNull()
})