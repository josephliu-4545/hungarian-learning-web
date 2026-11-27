import { describe, expect, it } from 'vitest'
import html from '../../index.html?raw'

describe('mobile document shell', () => {
  const page = new DOMParser().parseFromString(html, 'text/html')
  it('declares a real device viewport without disabling pinch zoom', () => {
    const viewport = page.querySelector('meta[name="viewport"]')?.getAttribute('content') ?? ''
    expect(viewport).toContain('width=device-width')
    expect(viewport).toContain('initial-scale=1')
    expect(viewport).not.toMatch(/user-scalable\s*=\s*no|maximum-scale\s*=\s*1(?:[,\s]|$)/i)
    expect(page.compatMode).toBe('CSS1Compat')
  })
  it('declares the title, language, encoding and application root', () => {
    expect(page.title).toBe('Magyar Learning')
    expect(page.documentElement.lang).toBe('en')
    expect(page.querySelector('meta[charset]')?.getAttribute('charset')).toBe('UTF-8')
    expect(page.querySelector('#root')).not.toBeNull()
  })
})
