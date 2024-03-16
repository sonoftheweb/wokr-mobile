import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Chip, SegmentedButtons, Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import { getAllServices } from '../../Redux/Service/slice'
import { AppDispatch, RootState } from '../../Redux/store'
import { Service } from '../../Utils/types'
import { styles } from '../../styles'
import { Database } from '../../Utils/types/database'
import { saveUserProfileChanges } from '../../Redux/User/slice'
import { NavProps } from '../../Layout/Navigation'

export default function OnboardingScreen({ navigation }: any) {
  const dispatch: AppDispatch = useDispatch()
  const services: Service[] | null = useSelector(
    (state: RootState) => state.services.services,
  )
  const loading = useSelector((state: RootState) => state.user.loading)

  const [isServiceProvider, setIsServiceProvider] = React.useState<string>('')
  const [servicesProvided, setServicesProvided] = React.useState<string[]>([])
  const [showSubmit, setShowSubmit] = React.useState<boolean>(false)

  useEffect(() => {
    if (isServiceProvider === 'yes') {
      dispatch(getAllServices()).then(_ => {})
    } else {
      setServicesProvided([])
    }
    setShowSubmit(
      isServiceProvider === 'yes' ? servicesProvided.length > 0 : true,
    )
  }, [isServiceProvider, servicesProvided.length])

  const toggleService = (serviceKey: string) => {
    if (servicesProvided.includes(serviceKey)) {
      setServicesProvided(servicesProvided.filter(key => key !== serviceKey))
    } else {
      setServicesProvided([...servicesProvided, serviceKey])
    }
  }

  const saveData = () => {
    const profileData: Database['public']['Tables']['profiles']['Update'] = {
      services: servicesProvided,
      provider: isServiceProvider === 'yes',
    }
    dispatch(saveUserProfileChanges(profileData))
  }

  return (
    <View
      style={{
        ...styles.centerContent,
        ...styles.page,
        justifyContent: 'flex-start',
        marginTop: '60%',
      }}
    >
      <Text variant="headlineMedium" style={styles.text}>
        One final question
      </Text>
      <View style={{ width: 250, marginTop: 10 }}>
        <Text
          variant="bodyLarge"
          style={{ ...styles.text, marginVertical: 5, textAlign: 'center' }}
        >
          Do you want to provide services to other users?
        </Text>

        <SegmentedButtons
          value={isServiceProvider}
          onValueChange={setIsServiceProvider}
          buttons={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]}
        />
      </View>
      {isServiceProvider === 'yes' && (
        <>
          <View style={{ width: 250, marginTop: 10 }}>
            <Text
              variant="bodyLarge"
              style={{
                ...styles.text,
                marginVertical: 15,
                textAlign: 'center',
              }}
            >
              What services are you able to provide. It's best to select what
              you love to do or what you have experience in.
            </Text>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {services?.map((service, index) => (
                <Chip
                  style={{ marginBottom: 5, marginHorizontal: 3 }}
                  key={service.key}
                  icon={
                    servicesProvided.includes(service.key)
                      ? 'check'
                      : 'checkbox-blank-outline'
                  }
                  onPress={() => toggleService(service.key)}
                  mode={
                    servicesProvided.includes(service.key) ? 'flat' : 'outlined'
                  }
                  selected={servicesProvided.includes(service.key)}
                >
                  {service.name}
                </Chip>
              ))}
            </View>
          </View>
          {showSubmit && (
            <Button
              style={{ marginTop: 30 }}
              mode="contained"
              loading={loading}
              onPress={saveData}
            >
              Done!
            </Button>
          )}
        </>
      )}
    </View>
  )
}
