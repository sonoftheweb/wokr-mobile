import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { AppState } from 'react-native'
import { Database } from './types/database'

// Yes you can use this in here as we have already setup RLS in postgres
const supabaseUrl = 'https://ropukkaohcgkhxyjonha.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvcHVra2FvaGNna2h4eWpvbmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg0OTQ4MzAsImV4cCI6MjAyNDA3MDgzMH0.PGmwRt01Y_udaJv7m65By_4VgTLhVrZf8ehg3LLeaO4'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', state => {
  if (state === 'active') {
    supabase.auth
      .startAutoRefresh()
      .then(_ => console.log('Started auto refresh...'))
  } else {
    supabase.auth
      .stopAutoRefresh()
      .then(_ => console.log('Stopped auto refresh...'))
  }
})
