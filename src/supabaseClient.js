import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cschvmrolksdbothvpvp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzY2h2bXJvbGtzZGJvdGh2cHZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIwMjQxNDEsImV4cCI6MTk3NzYwMDE0MX0.kJgebYrdXPMrcxPmUS7mcV1R1aPvM-CJNHN51jp8flk'

console.log(supabaseUrl)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)