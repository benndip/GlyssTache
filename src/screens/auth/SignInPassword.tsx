import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import {hooks} from '../../hooks';
import {utils} from '../../utils';
import {theme} from '../../constants';
import {CONFIG} from '../../config';
import {actions} from '../../store/actions';
import {svg} from '../../assets/svg';
import {handleTextChange} from '../../utils/handleTextChange';
import {SignInPasswordScreenProps} from '../../types/ScreenProps';
import {validatePassword} from '../../validation/validatePassword';
import {jwtDecode} from 'jwt-decode';
import {UserType} from '../../types/UserType';
import {BodyS} from '../../components/Typography';
import {spaces} from '../../constants/spaces';
import OnboardingForm from '../../components/onboarding/OnboardingForm';

const SignInPassword: React.FC<SignInPasswordScreenProps> = ({route}) => {
  const {email, mode} = route.params;
  const dispatch = hooks.useAppDispatch();
  const navigation = hooks.useAppNavigation();
  const [isPasswordExists, SetIsPasswordExists] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [isValidFormat, setIsValidFormat] = useState<boolean>(false);
  const rememberMe = hooks.useAppSelector(state => state.authSlice.rememberMe);
  const [loading, setLoading] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const handlePasswordChange = handleTextChange(setPassword);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const user = {email, password, 'remember-me': true};
  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const response = await axios({
        data: {email},
        method: 'post',
        headers: CONFIG.headers,
        url: CONFIG.base_url + 'auth/v1/forget',
      });
      if (response.status === 200) {
        navigation.navigate('VerifyOtpEmail', {
          email: email,
          mode: 'forget_password',
        });
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    dispatch(actions.setRememberMe(true));
    setIsValidFormat(validatePassword(password ?? ''));
    if (loading) {
      emailInputRef.current?.blur();
      passwordInputRef.current?.blur();
    }
  }, [loading]);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const response = await axios({
        data: user,
        method: 'post',
        headers: CONFIG.headers,
        url: CONFIG.base_url + 'auth/v1/login',
      });
      if (response.status === 200 && response.data === 'ok') {
        setLoading(false);
        navigation.navigate('SignInPassword', {email: email});
        return;
      } else {
        setLoading(false);
        dispatch(
          actions.setToken({
            jwt: response.data.jwt,
            refreshToken: response.data.refresh_token,
          }),
        );
        const decodedJwt = jwtDecode<UserType>(response.data.jwt);
        dispatch(
          actions.setUser({
            id: decodedJwt.id,
            email: decodedJwt.email,
          }),
        );
      }
    } catch (error: any) {
      setLoading(false);
      SetIsPasswordExists(false);
    }
  };

  return (
    <OnboardingForm
      title={
        mode === 'email_already_exists'
          ? 'Vous êtes de retour !'
          : 'Mot de passe'
      }
      description={
        !isPasswordExists
          ? 'Le mot de passe que vous avez entré est incorrect'
          : undefined
      }
      value={password}
      descriptionStyle={{
        color: theme.colors.error,
      }}
      eyeOffIcon={true}
      keyboardType="default"
      innerRef={passwordInputRef}
      placeholder="Entrer votre mot de passe"
      secureTextEntry={secureTextEntry}
      onChangeText={text => {
        handlePasswordChange(text);
        SetIsPasswordExists(true);
        setIsValidFormat(validatePassword(text));
      }}
      onSubmitEditing={() => {
        handleSignIn();
      }}
      setSecureTextEntry={setSecureTextEntry}
      containerStyle={{
        borderColor: isPasswordExists
          ? theme.colors.transparent
          : theme.colors.error,
      }}
      onNextPress={handleSignIn}
      onBackPress={() => {
        navigation.goBack();
      }}
      nextButtonLoading={loading}
      nextButtonDisabled={!isValidFormat}>
      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity
          style={styles.rememberMeButton}
          onPress={() => {
            dispatch(actions.setRememberMe(!rememberMe));
          }}>
          <View style={styles.checkboxContainer}>
            {rememberMe && <svg.RememberCheckSvg />}
          </View>
          <BodyS style={styles.rememberMeText} numberOfLines={1}>
            Se souvenir de moi
          </BodyS>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSendOtp}>
          <BodyS style={styles.forgotPasswordText} numberOfLines={1}>
            Mot de passe oublié
          </BodyS>
        </TouchableOpacity>
      </View>
    </OnboardingForm>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    maxWidth: '100%',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: utils.responsiveHeight(70),
  },
  contentContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: spaces.md,
    paddingVertical: utils.responsiveHeight(40),
  },
  bottomContainer: {
    paddingHorizontal: spaces.md,
    paddingVertical: utils.responsiveHeight(40),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginBottom: utils.responsiveHeight(30),
  },
  rememberMeButton: {
    display: 'none',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.onPrimary,
    borderColor: theme.colors.gray,
  },
  rememberMeText: {
    marginLeft: 10,
  },
  forgotPasswordText: {
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
  errorContainer: {
    paddingBottom: 15,
  },
  safeAreaView: {
    backgroundColor: theme.colors.background,
  },
});

export default SignInPassword;
