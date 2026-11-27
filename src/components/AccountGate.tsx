import { useEffect, useState, type ReactNode, type FormEvent } from 'react'
import type { Session, SupabaseClient } from '@supabase/supabase-js'
import { authReturnUrl, emailEnabled } from '../domain/supabaseClient'
import { useCloudProgress } from '../hooks/useCloudProgress'
import { exportProgress } from '../domain/backup'
import type { AppProgress } from '../types'
import type { PiperVoiceId } from '../data/audioManifest'
import type { Dispatch, SetStateAction } from 'react'

export type AccountLearningProps = { progress: AppProgress; setProgress: Dispatch<SetStateAction<AppProgress>>; voice: PiperVoiceId; setVoice: (voice: PiperVoiceId) => void; accountPanel?: ReactNode; cloud?: boolean }
type GuestRenderer = (panel?: ReactNode) => ReactNode
type AccountRenderer = (props: AccountLearningProps) => ReactNode

export function AccountGate({client,guest,account}:{client:SupabaseClient;guest:GuestRenderer;account:AccountRenderer}) {
  const [session,setSession] = useState<Session|null|undefined>(undefined)
  const [recovery,setRecovery] = useState(false)
  const [showLogin,setShowLogin] = useState(false)
  useEffect(()=>{
    const {data:{subscription}}=client.auth.onAuthStateChange((event,next)=>{
      setSession(next)
      if(event==='PASSWORD_RECOVERY') setRecovery(true)
      if(event==='SIGNED_OUT') setRecovery(false)
    })
    return ()=>subscription.unsubscribe()
  },[client])
  if(session===undefined) return <main className="page-container"><p role="status">Checking account…</p></main>
  if(recovery && session) return <AuthForm client={client} recovery close={()=>setRecovery(false)}/>
  if(session) return <CloudAccount key={session.user.id} client={client} session={session} account={account}/>
  return guest(<section className="account-strip"><div><strong>Studying as a guest</strong><small>Sign in to continue on another device.</small></div><button className="button button-primary" onClick={()=>setShowLogin(value=>!value)}>{showLogin?'Close sign in':'Sign in'}</button>{showLogin && <div className="account-form-wrap"><AuthForm client={client} close={()=>setShowLogin(false)}/></div>}</section>)
}
function AuthForm({client,recovery=false,close}:{client:SupabaseClient;recovery?:boolean;close:()=>void}) {
  const [mode,setMode]=useState<'login'|'register'|'reset'>('login')
  const [showPassword,setShowPassword]=useState(false)
  const [confirmationRequested,setConfirmationRequested]=useState(false)
  const [email,setEmail]=useState(''),[password,setPassword]=useState(''),[busy,setBusy]=useState(false),[message,setMessage]=useState('')
  async function run(action:()=>Promise<void>){setBusy(true);setMessage('');try{await action()}catch(error){setMessage(error instanceof Error?error.message:'Unable to complete sign-in. Please try again.')}finally{setBusy(false)}}
  async function submit(event:FormEvent){event.preventDefault();await run(async()=>{
    if(recovery){const {error}=await client.auth.updateUser({password});if(error)throw error;close();return}
    if(mode==='reset'){const {error}=await client.auth.resetPasswordForEmail(email.trim(),{redirectTo:authReturnUrl()});if(error)throw error;setMessage('If the account exists, check your inbox and Spam folder for a recovery link.');return}
    if(mode==='register'){const {error}=await client.auth.signUp({email:email.trim(),password,options:{emailRedirectTo:authReturnUrl()}});if(error)throw error;setConfirmationRequested(true);setMessage('Check your inbox and Spam folder for a confirmation link.');return}
    const {error}=await client.auth.signInWithPassword({email:email.trim(),password});if(error)throw error
  })}
  return <section className="surface-section account-form"><h2>{recovery?'Choose a new password':mode==='register'?'Create your account':mode==='reset'?'Reset password':'Sign in to Magyar Learning'}</h2>
    {!recovery && <button className="button full-button" disabled={busy} onClick={()=>void run(async()=>{const {error}=await client.auth.signInWithOAuth({provider:'google',options:{redirectTo:authReturnUrl(),scopes:'openid email profile'}});if(error)throw error})}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 48 48"><path fill="#4285f4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.1v5.1h6.6c3.9-3.6 6.1-8.8 6.1-14.9z"/><path fill="#34a853" d="M24 44c5.5 0 10.1-1.8 13.5-4.6l-6.6-5.1c-1.8 1.2-4.1 1.9-6.9 1.9-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20 20 0 0 0 24 44z"/><path fill="#fbbc05" d="M12.6 27.8a12 12 0 0 1 0-7.6V15H5.8a20 20 0 0 0 18z"/><path fill="#ea4335" d="M24 11.8c3 0 5.7 1 7.8 3l5.8-5.8A19.3 19.3 0 0 0 24 4 20 20 0 0 0 5.8 15l6.8 5.2c1.6-4.8 6.1-8.4 11.4-8.4z"/></svg>Continue with Google</button>}
    {(emailEnabled||recovery) ? <form onSubmit={submit}>{!recovery&&<label>Email<input type="email" value={email} onChange={e=>{setEmail(e.target.value);setConfirmationRequested(false)}} autoComplete="email" required/></label>}{(mode!=='reset'||recovery)&&<label>Password<input type={showPassword?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} autoComplete={recovery||mode==='register'?'new-password':'current-password'} minLength={recovery||mode==='register'?8:undefined} required/></label>}{(mode!=='reset'||recovery)&&<button type="button" className="text-button password-toggle" onClick={()=>setShowPassword(value=>!value)} aria-pressed={showPassword}>{showPassword?"Hide password":"Show password"}</button>}<button className="button button-primary full-button" disabled={busy}>{recovery?'Save password':mode==='register'?'Register':mode==='reset'?'Send recovery email':'Sign in with email'}</button></form>:<p>Email registration and login will open after email delivery is configured.</p>}
    {!recovery&&emailEnabled&&<div className="study-controls">{(['login','register','reset'] as const).filter(value=>value!==mode).map(value=><button className="text-button" key={value} onClick={()=>{setMode(value);setMessage('');setPassword('');setConfirmationRequested(false);setShowPassword(false)}}>{value==='login'?'Sign in':value==='register'?'Create account':'Forgot password?'}</button>)}</div>}
    {confirmationRequested && mode==='register' && <button className="button full-button" disabled={busy||!email.trim()} onClick={()=>void run(async()=>{const {error}=await client.auth.resend({type:'signup',email:email.trim(),options:{emailRedirectTo:authReturnUrl()}});if(error)throw error;setMessage('If a confirmation is needed, check your inbox and Spam folder. Use the latest link.');})}>Resend confirmation email</button>}
    {message&&<p className="account-message" role="status">{message}</p>}<a href={import.meta.env.BASE_URL+'privacy.html'}>Privacy policy</a>
  </section>
}
function backup(progress:AppProgress){const url=URL.createObjectURL(new Blob([exportProgress(progress)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='magyar-progress-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function CloudAccount({client,session,account}:{client:SupabaseClient;session:Session;account:AccountRenderer}){
  const sync=useCloudProgress(client,session.user.id)
  const [message,setMessage]=useState('')
  const [settingsOpen,setSettingsOpen]=useState(false)
  const [sending,setSending]=useState(false)
  const signOut=async()=>{
    if(sync.hasPending()&&!window.confirm('Some progress is not synchronized. It will remain in this browser if storage is available. Sign out anyway?'))return
    const {error}=await client.auth.signOut({scope:'local'});if(error)setMessage(error.message)
  }
  const panel=<section className="account-strip"><div><strong>{session.user.email??'Signed in'}</strong><small role="status">{sync.status==='saved'?'Synced to cloud':sync.status==='pending'?'Saving progress…':sync.status==='offline'?'Cloud unavailable · retrying':sync.status==='loading'?'Checking cloud progress…':sync.status==='conflict'?'Progress conflict':sync.status==='cache-error'?'Local cache could not be read':sync.status==='missing'?'Cloud record missing':'Choose your starting progress'}</small></div><button className="button" onClick={sync.retry}>Sync now</button><button className="button" aria-expanded={settingsOpen} onClick={()=>setSettingsOpen(value=>!value)}>Account settings</button><button className="button" onClick={()=>void signOut()}>Sign out</button>{sync.storageWarning&&<p role="alert">Browser storage unavailable. Keep this tab open and export progress before leaving if not synced.</p>}{settingsOpen&&<div className="account-settings"><h2>Your account</h2><p>Signed in as {session.user.email??'Account holder'}. Progress is saved to your account and cached on this browser.</p><div className="study-controls">{sync.snapshot&&<button className="button" onClick={()=>backup(sync.snapshot!.progress)}>Export progress</button>}{emailEnabled&&session.user.email&&session.user.identities?.some(identity=>identity.provider==='email')&&<button className="button" disabled={sending} onClick={async()=>{setSending(true);setMessage('');try{const {error}=await client.auth.resetPasswordForEmail(session.user.email!,{redirectTo:authReturnUrl()});if(error)throw error;setMessage('Check your inbox and Spam folder for a password reset link.')}catch(error){setMessage(error instanceof Error?error.message:'Unable to send recovery email.')}finally{setSending(false)}}}>Change password by email</button>}</div><h3>Delete your account</h3><p>Account deletion is handled by the website operator. Contact the operator using the support email on the Google consent screen or the person who provided your access. Request deletion from your registered email address. Export your learning progress first if you wish to keep it. Do not send passwords or codes.</p><p>On a shared device, sign out and clear this website’s browser data after exporting any guest progress you want to keep.</p><a href={import.meta.env.BASE_URL+'privacy.html'}>Privacy policy and data requests</a></div>}{message&&<p role="status">{message}</p>}</section>
  if(sync.status==='import'&&sync.guest)return <main className="page-container">{panel}<section className="surface-section"><h2>Keep your existing progress?</h2><p>Import progress from this browser only if it belongs to you. Your guest copy will remain untouched.</p><div className="study-controls"><button className="button button-primary" onClick={()=>sync.startAccount(true)}>Import guest progress</button><button className="button" onClick={()=>sync.startAccount(false)}>Start fresh</button></div></section></main>
  if(sync.status==='conflict'&&sync.conflict&&sync.snapshot)return <main className="page-container">{panel}<section className="surface-section"><h2>Progress changed in two places</h2><p>Choose which version to keep. Export both first if you want a backup. The other version will be replaced; scores are not automatically merged.</p><div className="study-controls"><button className="button" onClick={()=>backup(sync.snapshot!.progress)}>Export this device</button><button className="button" onClick={()=>backup(sync.conflict!.progress)}>Export cloud copy</button><button className="button" onClick={()=>{if(confirm('Replace cloud progress with this device’s progress?'))sync.resolve(true)}}>Keep this device</button><button className="button" onClick={()=>{if(confirm('Replace this device’s progress with cloud progress?'))sync.resolve(false)}}>Keep cloud version</button></div></section></main>
  if(!sync.snapshot||sync.status==='missing'||sync.status==='cache-error')return <main className="page-container">{panel}<section className="surface-section"><h2>{sync.status==='missing'?'Cloud record not found':sync.status==='cache-error'?'Local data needs attention':'Connecting your account'}</h2><p>{sync.status==='missing'||sync.status==='cache-error'?'We have stopped automatic writes to protect your data. Contact support before resetting browser storage.':'Your account progress will appear after the cloud connection is ready.'}</p>{sync.snapshot&&<button className="button" onClick={()=>backup(sync.snapshot!.progress)}>Export progress</button>}</section></main>
  return account({progress:sync.snapshot.progress,voice:sync.snapshot.voice,setProgress:sync.setProgress,setVoice:sync.setVoice,accountPanel:panel,cloud:true})
}
