import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView,  Share as RNShare, Alert, StatusBar } from 'react-native'
import React, { useCallback, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ProfileStackParamList } from '../../types/navigation'
import { deviceHeight, deviceWidth } from '../../constants/sizes'
import { theme } from '../../constants'
import { svg } from '../../assets/svg'
import { Plus, Share } from "lucide-react-native"
import {components} from '../../components'
import { spaces } from '../../constants/spaces'
import { colors } from '../../constants/colors'
import useProfile from '../../hooks/profile/useProfile'

type NavProps = NativeStackScreenProps<ProfileStackParamList, 'UserProfile'> 


const UserProfile: React.FC<NavProps> = ({ navigation }) => {

    const [messageToShare, setMessageToShare] = useState('');

    const {profile} = useProfile();
  

    const onShare = useCallback(async () => {
      try {
        const result = await RNShare.share({
          message: messageToShare || profile.pseudo + ' est sur l’application Glyss',
        });

        if (result.action === RNShare.sharedAction) {
          if (result.activityType) {
            console.log('Shared with activity type:', result.activityType);
          } else {
            console.log('Shared');
          }
        } else if (result.action === RNShare.dismissedAction) {
          console.log('dismissed');
        }
      } catch (error: any) {
        Alert.alert(error.message);
      }
    }, [messageToShare]);

    const goToFriends = () => {
        navigation.navigate('Friends')
    }

    const goToFriendRequests = () => {
        navigation.navigate('FriendRequests')
    }

    const goToAddFriend = () => {
        navigation.navigate('AddFriend')
    }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <components.HeaderLocation>
          <View style={styles.profileAndShareContainer}>
            <View style={styles.profileContainer}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgmu1RuVkp7FMsW1uXtqXxP-B55nAX_eTacg&s',
                }}
                style={styles.avatarImage}
              />
              <View style={styles.nameAndUsernameContainer}>
                <Text style={styles.name}>{`${profile?.firstName + ' ' + profile?.lastName}`}</Text>
                <Text style={styles.username}>@{profile?.pseudo}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.shareIconContainer} onPress={onShare}>
              <Share color={theme.colors.onPrimary} />
            </TouchableOpacity>
          </View>
          <View style={styles.friendAndInviteContainer}>
            <TouchableOpacity style={styles.numberOfFriendsContainer} onPress={goToFriends}>
              <Text style={styles.numberOfFriends}>52 amis</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.friendRequestsContainer} onPress={goToFriendRequests}>
              <Text style={styles.friendRequests}>Demandes d’ami(3)</Text>
            </TouchableOpacity>
          </View>
        </components.HeaderLocation>
        <View style={styles.addFriendButtonContainer}>
          <components.Button
            touchableOpacityStyle={{
              paddingHorizontal: spaces.md,
              width: '100%',
            }}
            title={
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Plus
                    size={20}
                    strokeWidth={3}
                    color={theme.colors.onPrimary}
                />
                <Text style={styles.addFriend}>Ajouter un ami</Text>
              </View>
            }
            onPress={goToAddFriend}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background
    },
    profileAndShareContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: deviceHeight * 0.1,
        justifyContent: 'space-between',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatarImage: {
        width: deviceWidth * 0.15,
        height: deviceWidth * 0.15,
        borderRadius: (deviceWidth * 0.15) / 2
    },
    nameAndUsernameContainer: {
        marginLeft: 20,
        gap: 5
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        color: theme.colors.onPrimary
    },
    username: {
        fontSize: 16,
        color: theme.colors.onPrimary
    },
    shareIconContainer: {
        borderColor: theme.colors.onPrimary,
        width: 50,
        height: 50,
        borderRadius: 30,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    friendAndInviteContainer: {
        marginTop: deviceHeight * 0.07,
        marginBottom: deviceHeight * 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        borderColor: theme.colors.onPrimary,
    },
    numberOfFriendsContainer: {
        borderWidth: 1,
        borderColor: theme.colors.onPrimary,
        borderRadius: 40,
        width: '25%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    numberOfFriends: {
        color: theme.colors.onPrimary,
        fontWeight: 'bold',
        fontSize: 18,
    },
    friendRequestsContainer: {
        borderColor: theme.colors.onPrimary,
        borderRadius: 40,
        backgroundColor: theme.colors.onPrimary,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45
    },
    friendRequests: {
        color: theme.colors.primary,
        fontWeight: 'bold',
        fontSize: 20,
    },
    addFriendContainer: {
        flexDirection: 'row',
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        gap: 10,
        alignItems: 'center',
        marginTop: deviceHeight * 0.07,
        borderRadius: 40,
        height: 45,
    },
    addFriend: {
        color: theme.colors.onPrimary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    addFriendButtonContainer: {
        marginTop: -spaces.xl,
        paddingHorizontal: spaces.md,
        paddingBottom: 20,
    },
    plusIcon:{
        position: 'absolute',
        zIndex: 99,
        left: deviceWidth * 0.3,
        top: '30%',
      }
})

export default UserProfile