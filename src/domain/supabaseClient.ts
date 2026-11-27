import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
// No privileged key is accepted by the browser integration.
export const supabase = import.meta.env.MODE !== 'test' && url && key?.startsWith('sb_publishable_') ? createClient(url, key, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
}) : null
export const emailEnabled = import.meta.env.VITE_EMAIL_AUTH_ENABLED === 'true'
export const authReturnUrl = () => new URL(import.meta.env.BASE_URL, window.location.origin + '/').href
