import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ProfileStackParamList } from '../types/navigation'

type NavProps = NativeStackScreenProps<ProfileStackParamList, 'AddFriend'>

const AddFriend: React.FC<NavProps> = () => {
  return (
    <View style={styles.conainer}>
      <Text>Ajouter un nouvel ami</Text>
    </View>
  )
}

export default AddFriend

const styles = StyleSheet.create({
    conainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})