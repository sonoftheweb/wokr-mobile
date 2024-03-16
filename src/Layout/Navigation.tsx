import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Session } from '@supabase/supabase-js'
import { useDispatch, useSelector } from 'react-redux'

import { supabase } from '../Utils/supabase'
import DashboardScreen from '../Views/Authed/DashboardScreen'
import MyTasksScreen from '../Views/Authed/MyTasksScreen'
import LoginScreen from '../Views/LoginScreen'
import RegisterScreen from '../Views/RegisterScreen'
import {
  NeedsOnboarding,
  SelectUserId,
  getMyProfile,
  setUserId,
} from '../Redux/User/slice'
import { AppDispatch } from '../Redux/store'
import OnboardingScreen from '../Views/Authed/OnboardingScreen'

export type NavProps = NativeStackScreenProps<any>

const AuthStack = createNativeStackNavigator()
const MainStack = createNativeStackNavigator()
const MainTabs = createMaterialBottomTabNavigator()

function MainTabsNavigator() {
  return (
    <MainTabs.Navigator>
      <MainTabs.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={20} />
          ),
        }}
      />
      <MainTabs.Screen
        name="MyTasks"
        component={MyTasksScreen}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="auto-fix" color={color} size={20} />
          ),
        }}
      />
    </MainTabs.Navigator>
  )
}

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login', headerShown: false }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  )
}

function MainStackNavigator() {
  // first check if requires onboarding
  const needsOnboarding = useSelector(NeedsOnboarding)
  return (
    <MainStack.Navigator>
      {needsOnboarding ? (
        <MainStack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <MainStack.Screen
          name="MainTabs"
          component={MainTabsNavigator}
          options={{ headerShown: false }}
        />
      )}
    </MainStack.Navigator>
  )
}

export default function NavigationStack() {
  const [session, setSession] = React.useState<Session | null>(null)
  const dispatch: AppDispatch = useDispatch()
  const userId = useSelector(SelectUserId)

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) {
        dispatch(setUserId(session.user.id))
        dispatch(getMyProfile())
      }
    })

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        if (session?.user) {
          dispatch(setUserId(session.user.id))
        } else {
          dispatch(setUserId(null))
        }
      },
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [dispatch])

  // Effect to dispatch getMyProfile when userId changes and is not null
  React.useEffect(() => {
    if (userId) {
      dispatch(getMyProfile())
    }
  }, [userId, dispatch])

  return (
    <NavigationContainer>
      {session && session.user ? (
        <MainStackNavigator />
      ) : (
        <AuthStackNavigator />
      )}
    </NavigationContainer>
  )
}
