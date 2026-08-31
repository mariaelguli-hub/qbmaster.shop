import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gziyhxhoswkidegileif.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6aXloeGhvc3draWRlZ2lsZWlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxMzYzMzMsImV4cCI6MjEwMzcxMjMzM30.x5VOiguA6Gta3Bxi9Iablb3oICpi1AGtxzr3xl7vw8Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
