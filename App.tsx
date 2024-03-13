import * as React from 'react'
import { AppRegistry } from 'react-native'
import { DefaultTheme, PaperProvider } from 'react-native-paper'
import App from './src/App'
import { Provider } from 'react-redux'
import { store } from './src/Redux/store'

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
    <Provider store={store}>  
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </Provider>
  )
}

AppRegistry.registerComponent('Wokr', () => Main)
