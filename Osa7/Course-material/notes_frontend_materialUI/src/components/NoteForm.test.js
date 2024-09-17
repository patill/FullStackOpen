import React from 'react'
import { render, screen } from '@testing-library/react'
//import '@testing-library/jest-dom/extend-expect'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createNote = jest.fn()

  render(<NoteForm createNote={createNote} />)

  //const input = screen.getByRole('textbox')
  const input = screen.getByPlaceholderText('A new note...')
  const sendButton = screen.getByText('save')
  //getByText löytää vain tekstiä, eikä sisäkkäisiä elementtiä, jotka sisältävät tekstiä. Tällöin pitää käyttää findByText, joka palauttaa promisen.

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})


//Syötekenttä etsitään metodin getByRole avulla. Syötekenttään kirjoitetaan metodin type avulla. Testin ensimmäinen ekspektaatio varmistaa, että lomakkeen lähetys on aikaansaanut tapahtumankäsittelijän createNote kutsumisen. Toinen ekspektaatio tarkistaa, että tapahtumankäsittelijää kutsutaan oikealla parametrilla, eli että luoduksi tulee samansisältöinen muistiinpano kuin lomakkeelle kirjoitetaan.

//Jos on useita kenttiä, voidaan tehdä niin:

//const inputs = screen.getAllByRole('textbox')
//await user.type(inputs[0], 'Text into the first field')
//await user.type(inputs[1], 'Text into the second field')

//Voidaan hakea oikea kenttä myös placeholder-tekstin avulla:

//const input = screen.getByPlaceholderText('A new note...')

//input-kentälle voidaan myös määritellä id="note-input", ja sitten
// luoda Dom: const { container } = render(<NoteForm createNote={createNote} />) ja hakea const input = container.querySelector('#note-input')