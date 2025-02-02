import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';

import {hooks} from '../../hooks';
import {theme} from '../../constants';
import {CONFIG} from '../../config';
import {validateEmail} from '../../validation/validateEmail';
import {handleTextChange} from '../../utils/handleTextChange';
import {SignInEmailScreenProps} from '../../types/ScreenProps';
import {debugError} from '../../utils/debug';
import {BodyM} from '../../components/Typography';
import OnboardingForm from '../../components/onboarding/OnboardingForm';
import {spaces} from '../../constants/spaces';

const SignInEmail: React.FC<SignInEmailScreenProps> = ({route}) => {
  const navigation = hooks.useAppNavigation();
  const [isEmailExists, SetIsEmailExists] = useState<boolean>(true);
  const [email, setEmail] = useState<string>(route.params.email ?? '');
  const [isValidFormat, setIsValidFormat] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleEmailChange = handleTextChange(setEmail);
  const emailInputRef = useRef<TextInput>(null);
  const user = {email};
  useEffect(() => {
    setIsValidFormat(validateEmail(email ?? ''));
    if (loading) {
      emailInputRef.current?.blur();
    }
  }, [loading]);
  const handleSignIn = async () => {
    try {
      setLoading(true);
      const response = await axios({
        data: user,
        method: 'post',
        headers: CONFIG.headers,
        url: CONFIG.base_url + 'auth/v1/user',
      });
      if (response.status === 200) {
        navigation.navigate('SignInPassword', {email: email});
      }
    } catch (error: any) {
      debugError(error);
      SetIsEmailExists(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardingForm
      value={email}
      title="Mon adresse e-mail"
      description={
        isEmailExists ? undefined : 'Aucun compte associé à cette adresse email'
      }
      descriptionStyle={{
        color: theme.colors.error,
      }}
      innerRef={emailInputRef}
      placeholder="nom@example.com"
      keyboardType="email-address"
      onChangeText={text => {
        handleEmailChange(text);
        SetIsEmailExists(true);
        setIsValidFormat(validateEmail(text));
      }}
      nextButtonLoading={loading}
      nextButtonDisabled={!isValidFormat}
      onNextPress={() => {
        handleSignIn();
      }}
      onBackPress={() => {
        navigation.goBack();
      }}
      onSubmitEditing={() => {
        handleSignIn();
      }}
      containerStyle={{
        borderColor: isEmailExists
          ? theme.colors.transparent
          : theme.colors.error,
      }}>
      {!isEmailExists && (
        <View
          style={{
            paddingBottom: spaces.md,
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUpEmail', {email: email});
            }}>
            <BodyM
              style={{
                color: theme.colors.primary,
                textDecorationLine: 'underline',
              }}
              numberOfLines={1}>
              Créer un compte
            </BodyM>
          </TouchableOpacity>
        </View>
      )}
    </OnboardingForm>
  );
};
export default SignInEmail;
