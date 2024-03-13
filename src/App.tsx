import * as React from 'react'
import { View, Text, AppState } from 'react-native'
import { useFonts } from 'expo-font'
import NavigationStack from './Layout/Navigation'

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
