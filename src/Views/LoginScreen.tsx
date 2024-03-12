import * as React from 'react'
import { useTheme, Text, TextInput, Button } from 'react-native-paper'
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

export default function LoginScreen({ navigation }: { navigation: any }) {
  const theme = useTheme()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordObscure, setPasswordObscure] = React.useState(true)

  const style = StyleSheet.create({
    screen: {
      flex: 1,
    },
    topContainer: {
      paddingTop: 300,
      paddingBottom: 20,
      paddingHorizontal: 40,
      backgroundColor: theme.colors.primary,
    },
    loginTextTop: {
      color: '#fff',
      fontFamily: 'NotoSerif',
    },
    label: {
      fontFamily: 'Noto',
      fontSize: 18,
      color: '#fff',
    },
    spaceAtop: {
      marginTop: 20,
    },
  })

  return (
    <KeyboardAvoidingView
      style={style.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView>
        <View style={style.topContainer}>
          <Text style={style.loginTextTop} variant="displayMedium">
            Sign in
          </Text>
          <Text
            style={{
              ...style.loginTextTop,
              fontSize: 17,
              fontFamily: 'Noto',
            }}
            variant="displaySmall"
          >
            Let's get some work done
          </Text>

          <View style={style.spaceAtop}>
            <TextInput
              mode="outlined"
              label="Email"
              style={{ backgroundColor: '#ffffff80', fontFamily: 'Noto' }}
              outlineStyle={{ borderWidth: 0 }}
              value={email}
              onChangeText={v => setEmail(v)}
            />
          </View>

          <View style={style.spaceAtop}>
            <TextInput
              mode="outlined"
              label="Password"
              secureTextEntry={passwordObscure}
              style={{ backgroundColor: '#ffffff80', fontFamily: 'Noto' }}
              outlineStyle={{ borderWidth: 0 }}
              right={
                <TextInput.Icon
                  onPress={_ => setPasswordObscure(!passwordObscure)}
                  icon="eye"
                />
              }
              value={password}
              onChangeText={v => setPassword(v)}
            />
          </View>
          <View style={style.spaceAtop}>
            <Text
              style={{ color: '#fff', textAlign: 'right', fontFamily: 'Noto' }}
              variant="bodyMedium"
            >
              Forgot Password?
            </Text>
          </View>
          <View style={style.spaceAtop}>
            <Button
              mode="contained"
              buttonColor="#fff"
              textColor={theme.colors.primary}
              onPress={() => console.log('Pressed')}
              style={{ shadowColor: '#000' }}
              labelStyle={{
                fontSize: 22,
                paddingVertical: 5,
                fontFamily: 'Noto',
              }}
            >
              Sign in
            </Button>
          </View>
        </View>

        <View style={{ padding: 20 }}>
          <Text
            style={{ textAlign: 'center', fontFamily: 'Noto' }}
            variant="titleMedium"
          >
            Don't have an account?
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 20,
            }}
          >
            <Button
              buttonColor="#EA4335"
              icon="google"
              mode="contained"
              onPress={() => console.log('Pressed')}
            >
              Google
            </Button>
            <Button
              buttonColor="#1877F2"
              icon="facebook"
              mode="contained"
              onPress={() => console.log('Pressed')}
            >
              Facebook
            </Button>
          </View>
          <View
            style={{
              ...style.spaceAtop,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Button
              style={{ width: '73%' }}
              buttonColor={theme.colors.shadow}
              mode="contained"
              onPress={() => navigation.navigate('Register')}
            >
              Sign up with email
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
