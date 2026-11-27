import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import App from '../App'

it('navigates among Dashboard, Learn, and Progress', async () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument()
  expect(screen.getAllByRole('button', { name: 'Dashboard' })[0]).toHaveAttribute('aria-current', 'page')
  await userEvent.click(screen.getAllByRole('button', { name: 'Learn' })[0])
  expect(screen.getByRole('heading', { name: /choose a module/i })).toBeInTheDocument()
  expect(screen.getAllByRole('button', { name: 'Learn' })[0]).toHaveAttribute('aria-current', 'page')
  await userEvent.click(screen.getAllByRole('button', { name: 'Progress' })[0])
  expect(screen.getByRole('heading', { name: /your learning, at a glance/i })).toBeInTheDocument()
})

