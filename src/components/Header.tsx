import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'


export function Header() {
  const [username, setUsername] = useState<String>()

  useEffect(() => {
    async function LoadStorageUsername() {
      const user = await AsyncStorage.getItem('@plantmanager:user')
      setUsername(user || '')
    }
    LoadStorageUsername()

  }, [])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.username}>{username}</Text>
      </View>

      <Image 
        source={{ uri: 'https://avatars.githubusercontent.com/u/45566439?v=4' }} 
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20
  },

  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },

  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  username: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40
  }

})