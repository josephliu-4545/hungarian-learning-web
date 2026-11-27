import { describe, expect, it } from 'vitest'
import { VOCABULARY } from '../data/curriculum'
import { validateApprovedReviewRows } from '../domain/curriculumQa'

const approved = {
  vocabularyId: VOCABULARY[0].id,
  moduleId: VOCABULARY[0].moduleId,
  hungarian: VOCABULARY[0].hungarian,
  english: VOCABULARY[0].english,
  sourcePages: VOCABULARY[0].sourcePages,
  reviewerApprovalStatus: 'approved' as const,
}

describe('curriculum QA approval import', () => {
  it('returns approved patches while preserving stable IDs', () => {
    expect(validateApprovedReviewRows(VOCABULARY, [approved])).toEqual([{ ...approved, verified: true }])
  })

  it('rejects unknown and duplicate IDs', () => {
    expect(() => validateApprovedReviewRows(VOCABULARY, [{ ...approved, vocabularyId: 'unknown' }])).toThrow(/unknown/i)
    expect(() => validateApprovedReviewRows(VOCABULARY, [approved, approved])).toThrow(/duplicate/i)
  })

  it('rejects approvals with a changed module or incomplete content', () => {
    expect(() => validateApprovedReviewRows(VOCABULARY, [{ ...approved, moduleId: 'departments' }])).toThrow(/module/i)
    expect(() => validateApprovedReviewRows(VOCABULARY, [{ ...approved, hungarian: '' }])).toThrow(/complete/i)
  })

  it('ignores pending and rejected rows rather than verifying them', () => {
    expect(validateApprovedReviewRows(VOCABULARY, [{ ...approved, reviewerApprovalStatus: 'pending' }])).toEqual([])
    expect(validateApprovedReviewRows(VOCABULARY, [{ ...approved, reviewerApprovalStatus: 'rejected' }])).toEqual([])
  })
})
