import { describe, expect, it } from 'vitest'
import { readAccountCache, writeAccountCache } from '../domain/accountCache'
import { decodeCloud } from '../domain/cloudRemote'
import { createEmptyProgress } from '../domain/progress'

const a='00000000-0000-4000-8000-000000000001',b='00000000-0000-4000-8000-000000000002'
describe('account storage and cloud decoding',()=>{
  it('keeps cached data separate for each account',()=>{
    const m=new Map<string,string>()
    const storage={getItem:(k:string)=>m.get(k)??null,setItem:(k:string,v:string)=>{m.set(k,v)}}
    const cache={local:{progress:createEmptyProgress(),voice:'anna' as const},base:null}
    writeAccountCache(a,cache,storage)
    expect(readAccountCache(a,storage)).toEqual(cache)
    expect(readAccountCache(b,storage)).toBeNull()
  })
  it('does not silently replace malformed cached progress',()=>{
    expect(()=>readAccountCache(a,{getItem:()=>'{invalid'})).toThrow()
    expect(()=>readAccountCache(a,{getItem:()=>JSON.stringify({local:{},base:null})})).toThrow()
  })
  it('validates cloud payload and revision before accepting it',()=>{
    const progress=createEmptyProgress()
    expect(decodeCloud({progress,preferred_voice:'imre',revision:2})).toEqual({progress,voice:'imre',revision:2})
    expect(()=>decodeCloud({progress,preferred_voice:'imre',revision:0})).toThrow()
    expect(()=>decodeCloud({progress:{},preferred_voice:'imre',revision:2})).toThrow()
  })
})
