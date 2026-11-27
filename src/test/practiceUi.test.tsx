import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import { Practice } from '../components/Practice'

it('opens a practice lesson and checks a response without changing mastery',async()=>{
  const user=userEvent.setup()
  render(<Practice moduleId="greetings" voice="anna" setVoice={()=>{}}/>)
  await user.click(screen.getByRole('button',{name:/everyday conversations/i}))
  await user.click(screen.getByRole('button',{name:/start practice/i}))
  expect(screen.getByText('Question 1 of 5')).toBeInTheDocument()
  const input=screen.queryByRole('textbox',{name:/your answer/i})
  if(input){await user.type(input,'Sajnos nem értem');await user.click(screen.getByRole('button',{name:/check answer/i}))}
  else {const choices=screen.getAllByRole('button').filter(button=>button.closest('.answer-grid'));await user.click(choices[0])}
  expect(screen.getByRole('status')).toBeInTheDocument()
  await user.click(screen.getByRole('button',{name:'Continue'}))
  expect(screen.getByText('Question 2 of 5')).toBeInTheDocument()
})
