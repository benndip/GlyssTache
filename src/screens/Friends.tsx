import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ProfileStackParamList } from '../types/navigation'

type NavProps = NativeStackScreenProps<ProfileStackParamList, 'Friends'>

const Friends: React.FC<NavProps> = () => {
  return (
    <View style={styles.conainer}>
      <Text>Cet écran contiendra la liste des amis</Text>
    </View>
  )
}

export default Friends

const styles = StyleSheet.create({
    conainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})