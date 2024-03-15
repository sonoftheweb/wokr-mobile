import * as React from 'react'
import { Text } from 'react-native-paper'
import {
  SafeAreaView,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import TaskList from '../../Components/Tasks/List'
import { useSelector } from 'react-redux'
import { GetUserFirstName } from '../../Redux/User/slice'

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = React.useState(false)
  const firstName = useSelector(GetUserFirstName)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    // You would typically call an API to reload content here.
    // For demonstration purposes, we'll just wait for 2 seconds and then stop the refresh.
    setTimeout(() => setRefreshing(false), 2000)
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={style.screen}>
          <Text variant="bodyLarge" style={style.welcomeTitle}>
            Welcome back, {firstName}
          </Text>

          <View style={{ marginTop: 20 }}>
            <TaskList />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  screen: {
    marginHorizontal: 30,
  },
  welcomeTitle: {
    marginTop: 30,
    fontWeight: '900',
    fontFamily: 'Noto',
  },
})
