import type { ModuleId, VocabularyItem } from '../types'

export type ReviewerApprovalStatus = 'pending' | 'approved' | 'rejected'

export type VocabularyReviewRow = {
  vocabularyId: string
  moduleId: string
  hungarian: string
  english: string
  sourcePages: number[]
  reviewerApprovalStatus: ReviewerApprovalStatus
}

export type ApprovedVocabularyPatch = Omit<VocabularyReviewRow, 'moduleId' | 'reviewerApprovalStatus'> & {
  moduleId: ModuleId
  reviewerApprovalStatus: 'approved'
  verified: true
}

export function validateApprovedReviewRows(current: VocabularyItem[], rows: VocabularyReviewRow[]): ApprovedVocabularyPatch[] {
  const byId = new Map(current.map((item) => [item.id, item]))
  const seen = new Set<string>()
  const approved: ApprovedVocabularyPatch[] = []

  for (const row of rows) {
    if (seen.has(row.vocabularyId)) throw new Error(`Duplicate vocabulary ID: ${row.vocabularyId}`)
    seen.add(row.vocabularyId)
    const existing = byId.get(row.vocabularyId)
    if (!existing) throw new Error(`Unknown vocabulary ID: ${row.vocabularyId}`)
    if (row.moduleId !== existing.moduleId) throw new Error(`Module cannot change for stable ID ${row.vocabularyId}`)
    if (row.reviewerApprovalStatus !== 'approved') continue
    if (!row.hungarian.trim() || !row.english.trim() || !row.sourcePages.length || row.sourcePages.some((page) => !Number.isInteger(page) || page < 1)) {
      throw new Error(`Approved row must be complete: ${row.vocabularyId}`)
    }
    approved.push({ ...row, moduleId: existing.moduleId, reviewerApprovalStatus: 'approved', verified: true })
  }
  return approved
}
