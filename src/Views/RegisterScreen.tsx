import * as React from 'react'
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import {
  Text,
  TextInput,
  Checkbox,
  useTheme,
  Button,
  Snackbar,
} from 'react-native-paper'
import { supabase } from '../Utils/supabase'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../Redux/store'
import { signUpWithEmail } from '../Redux/User/slice'

export default function RegisterScreen({ navigation }: { navigation: any }) {
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const loading = useSelector((state: RootState) => state.user.loading)

  const fullNameRef = React.useRef<typeof TextInput>(null)
  const emailRef = React.useRef<typeof TextInput>(null)
  const passwordRef = React.useRef<typeof TextInput>(null)
  const passwordConfirmationRef = React.useRef<typeof TextInput>(null)

  const [fullName, setFullName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('')
  const [tosChecked, setTosChecked] = React.useState(false)

  const [error, setError] = React.useState('')

  const validateAndLog = async () => {
    if (!fullName || !email || !password || !passwordConfirmation) {
      setError('All fields must be filled out')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters long')
      return
    }

    if (password !== passwordConfirmation) {
      setError('Password and confirmation password do not match')
      return
    }

    dispatch(signUpWithEmail({ full_name: fullName, email, password }))
    .then(() => {
      navigation.navigate('Login')
    })
    .catch((error) => {
      setError(error.message)
    })
  }

  // @ts-ignore
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
              secureTextEntry
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
              secureTextEntry
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
              loading={loading}
              disabled={!tosChecked || loading}
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

          <Snackbar
            visible={error.length > 0}
            onDismiss={() => setError('')}
            action={{
              label: 'Undo',
              onPress: () => {
                // Do something
              },
            }}
          >
            {error}
          </Snackbar>
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
