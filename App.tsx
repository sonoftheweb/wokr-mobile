import * as React from 'react'
import { AppRegistry } from 'react-native'
import { DefaultTheme, PaperProvider } from 'react-native-paper'
import App from './src/App'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1b39a9',
    secondary: '#28283c',
  },
}

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  )
}

AppRegistry.registerComponent('Wokr', () => Main)
