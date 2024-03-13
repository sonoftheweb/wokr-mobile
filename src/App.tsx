import * as React from 'react'
import { View, Text, AppState } from 'react-native'
import { useFonts } from 'expo-font'
import NavigationStack from './Layout/Navigation'
import { supabase } from './Utils/supabase'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', state => {
  if (state === 'active') {
    supabase.auth
      .startAutoRefresh()
      .then(r => console.log('Started auto refresh...'))
  } else {
    supabase.auth
      .stopAutoRefresh()
      .then(r => console.log('Stopped auto refresh...'))
  }
})

export default function App() {
  const [loaded, error] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat-VariableFont_wght.ttf'),
    Noto: require('../assets/fonts/NotoSans-VariableFont_wdth,wght.ttf'),
    NotoSerif: require('../assets/fonts/NotoSerifDisplay-VariableFont_wdth,wght.ttf'),
  })

  React.useEffect(() => {
    if (error) throw error
  }, [error])

  return (
    <>
      {!loaded ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <NavigationStack />
      )}
    </>
  )
}
