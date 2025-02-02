import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import {hooks} from '../../hooks';
import {theme} from '../../constants';
import {CONFIG} from '../../config';
import {validateEmail} from '../../validation/validateEmail';
import {handleTextChange} from '../../utils/handleTextChange';
import {SignUpEmailScreenProps} from '../../types/ScreenProps';
import {debugError} from '../../utils/debug';
import {BodyS} from '../../components/Typography';
import {spaces} from '../../constants/spaces';
import OnboardingForm from '../../components/onboarding/OnboardingForm';

const SignUpEmail: React.FC<SignUpEmailScreenProps> = ({route}) => {
  const dispatch = hooks.useAppDispatch();
  const navigation = hooks.useAppNavigation();
  const [isTCA, SetIsTCA] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(route.params.email ?? '');
  const [isValidFormat, setIsValidFormat] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleEmailChange = handleTextChange(setEmail);
  const emailInputRef = useRef<TextInput>(null);
  const user = {cgu: true, email};
  useEffect(() => {
    setIsValidFormat(validateEmail(email ?? ''));
  }, [loading]);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const response = await axios({
        data: user,
        method: 'post',
        headers: CONFIG.headers,
        url: CONFIG.base_url + 'auth/v1/register',
      });
      if (response.status === 201) {
        navigation.navigate('VerifyOtpEmail', {
          email: email,
          mode: 'create_account',
        });
      }
    } catch (error: any) {
      debugError(error);
      if (error.response.status === 409) {
        navigation.navigate('SignInPassword', {
          mode: 'email_already_exists',
          email: email,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardingForm
      title="Mon adresse e-mail"
      value={email}
      innerRef={emailInputRef}
      placeholder="nom@example.com"
      keyboardType="email-address"
      onChangeText={text => {
        handleEmailChange(text);
        setIsValidFormat(validateEmail(text));
      }}
      editable={!loading}
      onNextPress={() => {
        handleSignIn();
      }}
      onBackPress={() => {
        navigation.goBack();
      }}
      nextButtonLoading={loading}
      nextButtonDisabled={!isValidFormat}
      containerStyle={styles.formContainer}>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => {
            SetIsTCA(!isTCA);
            setIsValidFormat(validateEmail(email));
          }}>
          {isTCA === true && <View style={styles.checkboxInner} />}
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <BodyS>
            J'accepte de recevoir de la communication commerciale de Glyss et
            des bons plans des partenaires dans ma boite mail.
          </BodyS>
        </View>
      </View>
    </OnboardingForm>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    borderColor: theme.colors.transparent,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 8,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.grayLite,
    borderColor: theme.colors.primary,
  },
  checkboxInner: {
    width: 14,
    height: 14,
    borderWidth: 0,
    borderRadius: 4,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: spaces.sm,
  },
});

export default SignUpEmail;
