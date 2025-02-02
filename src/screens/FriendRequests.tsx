import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ProfileStackParamList } from '../types/navigation'

type NavProps = NativeStackScreenProps<ProfileStackParamList, 'FriendRequests'>

const FriendRequests: React.FC<NavProps> = () => {
  return (
    <View style={styles.conainer}>
      <Text>Faites des demandes d'amis ici</Text>
    </View>
  )
}

export default FriendRequests

const styles = StyleSheet.create({
    conainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})