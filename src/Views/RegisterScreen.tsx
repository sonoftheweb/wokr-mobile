import * as React from 'react'
import {
  SafeAreaView,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Text, TextInput, Checkbox, useTheme, Button } from 'react-native-paper'

export default function RegisterScreen({ navigation }: { navigation: any }) {
  const theme = useTheme()

  const fullNameRef = React.useRef<typeof TextInput>(null)
  const emailRef = React.useRef<typeof TextInput>(null)
  const passwordRef = React.useRef<typeof TextInput>(null)
  const passwordConfirmationRef = React.useRef<typeof TextInput>(null)

  const [fullName, setFullName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('')
  const [tosChecked, setTosChecked] = React.useState(false)

  const validateAndLog = () => {
    if (
      !fullName ||
      !email ||
      !password ||
      !passwordConfirmation ||
      !tosChecked
    ) {
      Alert.alert(
        'Error',
        'All fields are required and Terms must be accepted.',
      )
      return
    }
    if (password !== passwordConfirmation) {
      Alert.alert('Error', 'Passwords do not match.')
      return
    }
    console.log('Full Name:', fullName)
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('Terms Accepted:', tosChecked)
  }

  return (
    <KeyboardAvoidingView
      style={style.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView>
        <SafeAreaView>
          <View style={style.formContainer}>
            <Text style={style.registerTextTop} variant="displayMedium">
              Registration
            </Text>
            <Text
              style={{
                ...style.registerTextTop,
                fontSize: 17,
                fontFamily: 'Noto',
              }}
              variant="displaySmall"
            >
              Create an account
            </Text>
          </View>

          <View style={style.formGroup}>
            <TextInput
              ref={fullNameRef}
              mode="outlined"
              label="Full name"
              placeholder="John Doe"
              outlineStyle={{ borderWidth: 0 }}
              value={fullName}
              returnKeyType="next"
              onChangeText={v => setFullName(v)}
              onSubmitEditing={() => {
                emailRef.current?.focus()
              }}
            />
          </View>

          <View style={style.formGroup}>
            <TextInput
              ref={emailRef}
              mode="outlined"
              label="Email"
              placeholder="johndoe@email.com"
              outlineStyle={{ borderWidth: 0 }}
              value={email}
              returnKeyType="next"
              onChangeText={v => setEmail(v)}
              onSubmitEditing={() => {
                passwordRef.current?.focus()
              }}
            />
          </View>

          <View style={style.formGroup}>
            <TextInput
              ref={passwordRef}
              mode="outlined"
              label="Password"
              placeholder="A minimum of six characters"
              outlineStyle={{ borderWidth: 0 }}
              value={password}
              returnKeyType="next"
              onChangeText={v => setPassword(v)}
              onSubmitEditing={() => {
                passwordConfirmationRef.current?.focus()
              }}
            />
          </View>

          <View style={style.formGroup}>
            <TextInput
              ref={passwordConfirmationRef}
              mode="outlined"
              label="Retype password"
              placeholder="Retype the password"
              outlineStyle={{ borderWidth: 0 }}
              value={passwordConfirmation}
              onChangeText={v => setPasswordConfirmation(v)}
              onSubmitEditing={() => {}}
            />
          </View>

          <View
            style={[
              style.formGroup,
              { flexDirection: 'row', alignItems: 'center' },
            ]}
          >
            <Checkbox.Android
              status={tosChecked ? 'checked' : 'unchecked'}
              color={theme.colors.primary}
              uncheckedColor={theme.colors.primary}
              onPress={() => {
                setTosChecked(!tosChecked)
              }}
            />
            <Text style={{ marginLeft: 8, width: '90%', lineHeight: 20 }}>
              I accept the terms and conditions as well as the privacy policy of
              the application.
            </Text>
          </View>

          <View style={style.formGroup}>
            <Button
              mode="contained"
              buttonColor={theme.colors.primary}
              disabled={!tosChecked}
              onPress={validateAndLog}
              style={{ shadowColor: '#000' }}
              labelStyle={{ fontSize: 22, paddingVertical: 5 }}
            >
              Register
            </Button>
          </View>

          <View style={style.formGroup}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Noto',
                marginBottom: 5,
              }}
              variant="titleMedium"
            >
              Already have an account?
            </Text>

            <Button
              mode="contained"
              buttonColor="#000"
              onPress={() => navigation.navigate('Login')}
              style={{ shadowColor: '#000' }}
            >
              Sign in
            </Button>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const style = StyleSheet.create({
  screen: {
    flex: 1,
  },
  registerTextTop: {
    fontFamily: 'NotoSerif',
  },
  formContainer: {
    marginTop: '30%',
    marginHorizontal: 30,
  },
  formGroup: {
    marginTop: 30,
    marginHorizontal: 30,
  },
})
