import React, {useRef, useState} from 'react';
import {View, TextInput, ScrollView, Alert} from 'react-native';
import {hooks} from '../../hooks';
import {utils} from '../../utils';
import {custom} from '../../custom';
import {theme} from '../../constants';
import {components} from '../../components';
import {handleTextChange} from '../../utils/handleTextChange';
import {SignUpDetailsScreenProps} from '../../types/ScreenProps';
import RoundedDateTimePicker from '../../components/RoundedDateTimePicker';
import {H2} from '../../components/Typography';
import {spaces} from '../../constants/spaces';
import useCreateProfile from '../../hooks/profile/useCreateProfile';
import {debugError} from '../../utils/debug';

const SignUpDetails: React.FC<SignUpDetailsScreenProps> = ({route}) => {
  const dispatch = hooks.useAppDispatch();
  const navigation = hooks.useAppNavigation();

  const [isEmailExists, SetIsEmailExists] = useState<boolean>(true);
  const [FirstName, setFirstName] = useState<string>('');
  const [LastName, setLastName] = useState<string>('');
  const [Username, setUsername] = useState<string>('');
  const [DateOfBirth, setDateOfBirth] = useState<string>('');

  const handleFirstNameChange = handleTextChange(setFirstName);
  const handleLastNameChange = handleTextChange(setLastName);
  const handleUsernameChange = handleTextChange(setUsername);
  const handleDateOfBirthChange = handleTextChange(setDateOfBirth);

  const FirstNameInputRef = useRef<TextInput>(null);
  const LastNameInputRef = useRef<TextInput>(null);
  const UsernameInputRef = useRef<TextInput>(null);

  const {createProfile, isCreating} = useCreateProfile(
    () => {
      navigation.replace('TabNavigator');
    },
    (error: any) => {
      debugError(error);
      Alert.alert('Erreur', 'Impossible de créer le profil');
    },
  );
  const isDisabled =
    FirstName && LastName && Username && DateOfBirth ? false : true;

  const handleSignUpDetails = async () => {
    const birthDate = new Date(DateOfBirth.replace(/\//g, '-')).toISOString();
    createProfile({
      birth_date: birthDate,
      first_name: FirstName,
      last_name: LastName,
      pseudo: Username,
    });
  };

  const renderInputField = (): JSX.Element => {
    return (
      <>
        <H2
          style={{marginBottom: utils.responsiveHeight(15)}}
          numberOfLines={1}>
          Nom Prénom
        </H2>
        <custom.InputField
          value={LastName}
          innerRef={LastNameInputRef}
          placeholder="Nom"
          onChangeText={text => {
            handleLastNameChange(text);
          }}
          editable={!isCreating}
          containerStyle={{
            borderColor: isEmailExists
              ? theme.colors.transparent
              : theme.colors.error,
            marginBottom: utils.responsiveHeight(10),
          }}
        />
        <custom.InputField
          value={FirstName}
          innerRef={FirstNameInputRef}
          placeholder="Prénom"
          onChangeText={text => {
            handleFirstNameChange(text);
          }}
          editable={!isCreating}
          containerStyle={{
            borderColor: isEmailExists
              ? theme.colors.transparent
              : theme.colors.error,
            marginBottom: utils.responsiveHeight(10),
          }}
        />
        <H2
          style={{
            marginTop: utils.responsiveHeight(15),
            marginBottom: utils.responsiveHeight(15),
          }}
          numberOfLines={1}>
          Pseudo
        </H2>
        <custom.InputField
          value={Username}
          innerRef={UsernameInputRef}
          placeholder="Pseudo"
          onChangeText={text => {
            handleUsernameChange(text);
          }}
          editable={!isCreating}
          containerStyle={{
            borderColor: isEmailExists
              ? theme.colors.transparent
              : theme.colors.error,
            marginBottom: utils.responsiveHeight(10),
          }}
        />
        <H2
          style={{
            marginTop: utils.responsiveHeight(15),
            marginBottom: utils.responsiveHeight(15),
          }}
          numberOfLines={1}>
          Date de naissance
        </H2>
        <View>
          <RoundedDateTimePicker
            onChange={date => {
              handleDateOfBirthChange(date);
            }}
            editable={!isCreating}
          />
        </View>
      </>
    );
  };
  const renderButtonBack = (): JSX.Element => {
    return (
      <components.Button
        iconBack={true}
        touchableOpacityStyle={{
          paddingHorizontal: spaces.md,
          width: 80,
          backgroundColor: theme.colors.grayLite,
        }}
        title={''}
        onPress={() => {
          navigation.goBack();
        }}
      />
    );
  };
  const renderButton = (): JSX.Element => {
    return (
      <components.Button
        disabled={isDisabled}
        iconForward={true}
        touchableOpacityStyle={{paddingHorizontal: spaces.md, width: 140}}
        title={'Suivant'}
        loading={isCreating}
        onPress={() => {
          handleSignUpDetails();
        }}
      />
    );
  };
  const renderContent = (): JSX.Element => {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          maxWidth: '100%',
          width: '100%',
          alignSelf: 'center',
          alignItems: 'flex-start',
          justifyContent: 'center',
          alignContent: 'center',
          paddingTop: utils.responsiveHeight(70),
          backgroundColor: theme.colors.background,
        }}>
        <View
          style={{
            width: '100%',
            flex: 1,
            paddingHorizontal: utils.responsiveHeight(20),
            paddingVertical: utils.responsiveHeight(40),
          }}>
          {renderInputField()}
        </View>
        <View
          style={{
            paddingHorizontal: utils.responsiveHeight(20),
            paddingVertical: utils.responsiveHeight(40),
            width: '100%',
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            alignContent: 'center',
          }}>
          {renderButtonBack()}
          {renderButton()}
        </View>
      </ScrollView>
    );
  };
  return (
    <custom.SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
      }}
      statusBarStyle="dark-content"
      statusBarColor={theme.colors.background}
      insets={['top', 'bottom']}>
      {renderContent()}
    </custom.SafeAreaView>
  );
};
export default SignUpDetails;
