import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ropukkaohcgkhxyjonha.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvcHVra2FvaGNna2h4eWpvbmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg0OTQ4MzAsImV4cCI6MjAyNDA3MDgzMH0.PGmwRt01Y_udaJv7m65By_4VgTLhVrZf8ehg3LLeaO4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
