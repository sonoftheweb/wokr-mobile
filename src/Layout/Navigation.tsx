import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { User } from '@supabase/supabase-js'

import { supabase } from '../Utils/supabase'
import DashboardScreen from '../Views/Authed/DashboardScreen'
import MyTasksScreen from '../Views/Authed/MyTasksScreen'
import LoginScreen from '../Views/LoginScreen'
import RegisterScreen from '../Views/RegisterScreen'

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
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <MainTabs.Screen
        name="MyTasks"
        component={MyTasksScreen}
        options={{
          tabBarLabel: 'My Tasks',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="auto-fix" color={color} size={26} />
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
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="MainTabs"
        component={MainTabsNavigator}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  )
}

export default function NavigationStack() {
  const [user, setUser] = React.useState<null | User>(null)

  React.useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data?.user)
    }

    fetchUser()
  }, [])

  return (
    <NavigationContainer>
      {user ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  )
}
