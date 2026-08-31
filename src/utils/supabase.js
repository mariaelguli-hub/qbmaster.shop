import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gziyhxhoswkidegileif.supabase.co'
const supabaseAnonKey = 'sb_publishable_jURuFv2g1JN8PpXzuVtQmw_5jNfiQAX'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
