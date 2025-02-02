import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {hooks} from '../../hooks';
import {theme} from '../../constants';
import ValidatorPassword from '../../components/ValidatorPassword';
import {CONFIG} from '../../config';
import {actions} from '../../store/actions';
import {handleTextChange} from '../../utils/handleTextChange';
import {SetPasswordScreenProps} from '../../types/ScreenProps';
import {validatePassword} from '../../validation/validatePassword';
import {jwtDecode} from 'jwt-decode';
import {UserType} from '../../types/UserType';
import OnboardingForm from '../../components/onboarding/OnboardingForm';
const SetPassword: React.FC<SetPasswordScreenProps> = ({route}) => {
  const {email, mode, token} = route.params;
  const dispatch = hooks.useAppDispatch();
  const navigation = hooks.useAppNavigation();
  const [isPasswordExists, SetIsPasswordExists] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [isValidFormat, setIsValidFormat] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const handlePasswordChange = handleTextChange(setPassword);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  useEffect(() => {
    dispatch(actions.setRememberMe(true));
    setIsValidFormat(validatePassword(password ?? ''));
    if (loading) {
      emailInputRef.current?.blur();
      passwordInputRef.current?.blur();
    }
  }, [loading]);

  const handleChangePassword = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: 'patch',
        data: {email, password, token},
        headers: CONFIG.headers,
        url:
          CONFIG.base_url +
          'auth/v1/' +
          (mode == 'create_account'
            ? 'register/first-connection'
            : 'forget/password'),
      });
      if (response.status === 200) {
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
        if (mode == 'create_account') {
          navigation.replace('SignUpDetails', {mode: mode, email: email});
        } else {
          navigation.replace('TabNavigator');
        }
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardingForm
      title="Création du mot de passe"
      description="Minimum 8 caractères, au moins 1 caractère spécial et 1 chiffre."
      value={password}
      eyeOffIcon={true}
      keyboardType="default"
      secureTextEntry={secureTextEntry}
      setSecureTextEntry={setSecureTextEntry}
      containerStyle={{
        borderColor: isPasswordExists
          ? theme.colors.transparent
          : theme.colors.error,
      }}
      innerRef={passwordInputRef}
      placeholder="Entrer votre mot de passe"
      onChangeText={text => {
        handlePasswordChange(text);
        SetIsPasswordExists(true);
        setIsValidFormat(validatePassword(text));
      }}
      onNextPress={handleChangePassword}
      nextButtonDisabled={!isValidFormat}
      nextButtonLoading={loading}
      onBackPress={() => navigation.goBack()}>
      <ValidatorPassword password={password} />
    </OnboardingForm>
  );
};
export default SetPassword;
