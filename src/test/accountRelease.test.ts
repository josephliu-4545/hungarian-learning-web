import { describe, expect, it } from 'vitest'
import confirmHtml from '../../docs/auth-email-templates/confirm-signup.html?raw'
import recoveryHtml from '../../docs/auth-email-templates/reset-password.html?raw'
import privacyHtml from '../../public/privacy.html?raw'

describe('account release documents',()=>{
  it.each([confirmHtml,recoveryHtml])('keeps a single provider-generated verification link',(html)=>{
    expect(html.match(/\{\{ \.ConfirmationURL \}\}/g)).toHaveLength(1)
    expect(html).not.toContain('localhost')
    expect(html).toContain('Magyar Learning')
  })
  it('describes current account processing and manual deletion',()=>{
    expect(privacyHtml).toContain('Google Gmail SMTP')
    expect(privacyHtml).toContain('no automatic self-service deletion')
    expect(privacyHtml).not.toContain('planned account features')
  })
})
