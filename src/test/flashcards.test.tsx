import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import App from '../App'

vi.mock('../data/curriculum', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../data/curriculum')>()
  return { ...actual, VERIFIED_VOCABULARY: actual.VOCABULARY.filter((word) => word.moduleId === 'greetings').slice(0, 2).map((word) => ({ ...word, verified: true })) }
})

it('renders flashcards before the pronunciation settings and supports flipping, navigation and voice choice', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('button', { name: /greetings & everyday expressions/i }))
  const card = screen.getByRole('button', { name: /flip Hungarian flashcard/i })
  expect(within(card).getByText('Jó reggelt')).toBeInTheDocument()
  const voice = screen.getByRole('combobox', { name: /pronunciation voice/i })
  expect(card.compareDocumentPosition(voice) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  await user.click(card)
  expect(screen.getByRole('button', { name: /flip English flashcard: Good morning/i })).toBeInTheDocument()
  await user.selectOptions(voice, 'imre')
  await user.click(screen.getByRole('button', { name: 'Next card' }))
  expect(screen.getByRole('button', { name: /flip Hungarian flashcard: Jó napot/i })).toBeInTheDocument()
  expect(voice).toHaveValue('imre')
})
