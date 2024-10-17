import JailMonkey from 'jail-monkey'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

const App = () => {
  const [status, setstatus] = useState('')

  useEffect(() => {
    if (JailMonkey.isJailBroken()) {
      setstatus('root')
    } else if (JailMonkey.canMockLocation) {
      setstatus('canMockLocation')
    } else if (JailMonkey.isDebuggedMode) {
      setstatus('isDebuggedMode')
    } else {
      setstatus('aplikasi aman')
    }
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{status}</Text>
    </View>
  )
}

export default App