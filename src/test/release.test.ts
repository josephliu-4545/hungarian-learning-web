import { describe, expect, it } from 'vitest'
import { resolveReleaseMode } from '../domain/releaseMode'
import { betaAudioPath } from '../domain/hungarianAudio'
import { BETA_STORAGE_KEY, STORAGE_KEY, loadProgress, saveProgress } from '../domain/storage'
import { createEmptyProgress } from '../domain/progress'

describe('release modes',()=>{
  it('exposes provisional content only in explicit preview or beta mode',()=>{
    expect(resolveReleaseMode(true,false,'development','?preview=1')).toBe('preview')
    expect(resolveReleaseMode(false,true,'production','?preview=1')).toBe('reviewed')
    expect(resolveReleaseMode(false,true,'beta')).toBe('beta')
    expect(resolveReleaseMode(true,false,'beta')).toBe('reviewed')
  })
  it('resolves independent static audio paths and rejects invalid IDs',()=>{
    expect(betaAudioPath('greetings-jo-reggelt','anna')).toBe('audio-beta/anna/greetings-jo-reggelt.wav')
    expect(betaAudioPath('greetings-jo-reggelt','imre')).toBe('audio-beta/imre/greetings-jo-reggelt.wav')
    expect(betaAudioPath('../outside','anna')).toBeUndefined()
  })
  it('keeps beta progress separate from reviewed progress',()=>{
    const store=new Map<string,string>()
    const storage={getItem:(key:string)=>store.get(key)??null,setItem:(key:string,value:string)=>{store.set(key,value)}}
    const progress=createEmptyProgress()
    progress.lastModuleId='greetings'
    saveProgress(progress,storage,BETA_STORAGE_KEY)
    expect(loadProgress(storage,BETA_STORAGE_KEY).lastModuleId).toBe('greetings')
    expect(loadProgress(storage,STORAGE_KEY).lastModuleId).toBeUndefined()
  })
})
