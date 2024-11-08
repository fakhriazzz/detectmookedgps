import React, { useEffect, useState } from 'react'
import { PermissionsAndroid, Platform, Text, View } from 'react-native'
import Geolocation from 'react-native-geolocation-service'

const App = () => {
  const [status, setstatus] = useState('')
  const requestLocationPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app needs access to your location.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position.mocked);
            setstatus(position.mocked)
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
        // Call Geolocation.getCurrentPosition here
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const requestLocationPermissionIOS = () => {
    Geolocation.requestAuthorization('whenInUse').then((status) => {
      if (status === 'granted') {
        // Izin diberikan, panggil Geolocation.getCurrentPosition
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            setstatus(position.mocked)
          },
          (error) => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        console.log('Location permission not granted');
      }
    });
  }

  useEffect(() => {
    // if (JailMonkey.isJailBroken()) {
    //   setstatus('root')
    // } else if (JailMonkey.canMockLocation) {
    //   setstatus('canMockLocation')
    // } else if (JailMonkey.isDebuggedMode) {
    //   setstatus('isDebuggedMode')
    // } else {
    //   setstatus('aplikasi aman')
    // }
    if (Platform.OS == 'android') {
      requestLocationPermissionAndroid()
    } else {
      requestLocationPermissionIOS()
    }
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{status}</Text>
    </View>
  )
}

export default App