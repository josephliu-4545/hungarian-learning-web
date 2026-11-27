import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import App from '../App'
import { BETA_STORAGE_KEY, STORAGE_KEY } from '../domain/storage'

vi.mock('../domain/releaseMode', () => ({ releaseMode: 'beta', isBeta: true }))

it('opens real learning content without a preview query and persists beta progress separately', async () => {
  localStorage.clear()
  const user = userEvent.setup()
  const first = render(<App />)
  expect(screen.getByText(/Learning beta · AI-assisted curriculum/i)).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /greetings & everyday expressions/i }))
  expect(screen.getByRole('button', { name: /flip Hungarian flashcard: Jó reggelt/i })).toBeInTheDocument()
  expect(screen.getByRole('tab', { name: 'practice' })).toBeInTheDocument()
  await user.click(screen.getByRole('tab', { name: 'practice' }))
  expect(screen.getByRole('button', { name: /everyday conversations/i })).toBeInTheDocument()
  await waitFor(() => expect(JSON.parse(localStorage.getItem(BETA_STORAGE_KEY) ?? '{}').lastModuleId).toBe('greetings'))
  expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
  first.unmount()
  render(<App />)
  await user.click(screen.getByRole('button', { name: /continue/i }))
  expect(screen.getByRole('button', { name: /flip Hungarian flashcard: Jó reggelt/i })).toBeInTheDocument()
})
