import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { SupabaseClient } from '@supabase/supabase-js'
import { useCloudProgress } from '../hooks/useCloudProgress'
import { readCloud, writeCloud } from '../domain/cloudRemote'
import { readAccountCache } from '../domain/accountCache'
import { createEmptyProgress, recordAssessment } from '../domain/progress'
import type { CloudSnapshot } from '../domain/cloudSync'

vi.mock('../domain/cloudRemote',()=>({readCloud:vi.fn(),writeCloud:vi.fn()}))
const client={} as SupabaseClient
const user='00000000-0000-4000-8000-000000000001'
const baseline=():CloudSnapshot=>({progress:createEmptyProgress(),voice:'anna',revision:1})
beforeEach(()=>{localStorage.clear();vi.resetAllMocks()})
describe('cloud sync integration with simulated network',()=>{
  it('preserves edits after a failed write and retries using the observed revision',async()=>{
    const base=baseline()
    vi.mocked(readCloud).mockResolvedValue(base)
    vi.mocked(writeCloud).mockRejectedValueOnce(new Error('offline')).mockImplementation(async (_client,_id,local)=>({...local,revision:2}))
    const {result}=renderHook(()=>useCloudProgress(client,user))
    await waitFor(()=>expect(result.current.status).toBe('saved'))
    act(()=>result.current.setProgress(p=>recordAssessment(p,'greetings-jo-reggelt','quiz',true)))
    await waitFor(()=>expect(result.current.status).toBe('offline'),{timeout:3000})
    expect(readAccountCache(user)?.local.progress.assessmentAttempts).toBe(1)
    act(()=>window.dispatchEvent(new Event('online')))
    await waitFor(()=>expect(result.current.status).toBe('saved'),{timeout:3000})
    expect(vi.mocked(writeCloud)).toHaveBeenLastCalledWith(client,user,expect.objectContaining({progress:expect.objectContaining({assessmentAttempts:1})}),1)
    expect(readAccountCache(user)?.base?.revision).toBe(2)
  })
  it('stops writing when another device has divergent progress',async()=>{
    const base=baseline()
    vi.mocked(readCloud).mockResolvedValue(base)
    const {result}=renderHook(()=>useCloudProgress(client,user))
    await waitFor(()=>expect(result.current.status).toBe('saved'))
    act(()=>result.current.setProgress(p=>recordAssessment(p,'greetings-jo-reggelt','quiz',true)))
    const remote={...base,progress:recordAssessment(base.progress,'greetings-jo-napot','quiz',true),revision:2}
    vi.mocked(readCloud).mockResolvedValue(remote)
    act(()=>window.dispatchEvent(new Event('focus')))
    await waitFor(()=>expect(result.current.status).toBe('conflict'),{timeout:3000})
    expect(vi.mocked(writeCloud)).not.toHaveBeenCalled()
    expect(result.current.conflict).toEqual(remote)
    expect(readAccountCache(user)?.local.progress.words['greetings-jo-reggelt']).toBeDefined()
  })
})
