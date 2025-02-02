import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, TextInput, ScrollView} from 'react-native';

import {hooks} from '../../hooks';
import {utils} from '../../utils';
import {custom} from '../../custom';
import {UserType} from '../../types';
import {theme} from '../../constants';
import {components} from '../../components';
import {CONFIG} from '../../config';
import {VerifyOtpEmailScreenProps} from '../../types/ScreenProps';
import {BodyM, H2} from '../../components/Typography';
import {spaces} from '../../constants/spaces';

const VerifyOtpEmail: React.FC<VerifyOtpEmailScreenProps> = ({route}) => {
  const mode = route.params.mode;
  const email = route.params.email;
  const navigation = hooks.useAppNavigation();
  const [isPinIncorrect, setisPinIncorrect] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resendDisabled, setResendDisabled] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(300);
  const inp1Ref = useRef(null);
  const inp2Ref = useRef(null);
  const inp3Ref = useRef(null);
  const inp4Ref = useRef(null);
  const inp5Ref = useRef(null);
  const [inp1, setInp1] = useState('');
  const [inp2, setInp2] = useState('');
  const [inp3, setInp3] = useState('');
  const [inp4, setInp4] = useState('');
  const [inp5, setInp5] = useState('');
  const otp = inp1 + inp2 + inp3 + inp4 + inp5;
  const data: UserType = {email, otp};
  useEffect(() => {
    if (inp1Ref.current) {
      (inp1Ref.current as TextInput).focus();
    }
  }, []);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [resendDisabled, countdown]);
  const handleVerify = async () => {
    setLoading(true);
    try {
      const response = await fetch(CONFIG.base_url + 'auth/v1/otp/is-valid-for-email', {
        method: 'POST',
        headers: CONFIG.headers,
        body: JSON.stringify(data),
      });
      if (response.ok) {
        navigation.replace('SetPassword', {
          email: email,
          token: otp,
          mode: mode,
        });
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      setisPinIncorrect(true);
    } finally {
      setLoading(false);
    }
  };
  const handleResendOtp = async () => {
    try {
      setLoading(true);
      const response = await fetch(CONFIG.base_url + 'auth/v1/forget', {
        method: 'POST',
        headers: CONFIG.headers,
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setCountdown(300); // 5 minutes countdown
        setResendDisabled(true);
        return;
      }
    } finally {
      setLoading(false);
    }
  };
  const renderDescription = (): JSX.Element => {
    return (
      <H2 style={{marginBottom: utils.responsiveHeight(15)}} numberOfLines={1}>
        Vérifiez le code
      </H2>
    );
  };
  const renderInputFields = (): JSX.Element => {
    const inputStyle: object = {
      textAlign: 'center',
      flex: 1,
      width: '100%',
      fontSize: 18,
      color: theme.colors.onBackground,
    };
    const inputContainerStyle: object = {
      width: utils.responsiveWidth(59),
      height: utils.responsiveWidth(59),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 1,
      backgroundColor: theme.colors.background,
      borderColor: isPinIncorrect ? theme.colors.error : theme.colors.gray,
    };
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: utils.responsiveHeight(15),
        }}>
        <View style={{...inputContainerStyle}}>
          <TextInput
            ref={inp1Ref}
            maxLength={1}
            style={{...inputStyle}}
            keyboardType="number-pad"
            onChangeText={text => {
              setInp1(text);
              setisPinIncorrect(false);
              if (text !== '') {
                if (inp2Ref.current) {
                  (inp2Ref.current as TextInput).focus();
                }
              } else if (text === '') {
                if (inp1Ref.current) {
                  (inp1Ref.current as TextInput).focus();
                }
              }
            }}
            cursorColor={theme.colors.primary}
            selectionColor={theme.colors.primary + '90'}
          />
        </View>
        <View style={{...inputContainerStyle}}>
          <TextInput
            ref={inp2Ref}
            maxLength={1}
            style={{...inputStyle}}
            keyboardType="number-pad"
            onChangeText={text => {
              setInp2(text);
              setisPinIncorrect(false);
              if (text !== '') {
                if (inp3Ref.current) {
                  (inp3Ref.current as TextInput).focus();
                }
              } else if (text === '') {
                if (inp1Ref.current) {
                  (inp1Ref.current as TextInput).focus();
                }
              }
            }}
            cursorColor={theme.colors.primary}
            selectionColor={theme.colors.primary + '90'}
          />
        </View>
        <View style={{...inputContainerStyle}}>
          <TextInput
            ref={inp3Ref}
            maxLength={1}
            style={{...inputStyle}}
            keyboardType="number-pad"
            onChangeText={text => {
              setInp3(text);
              setisPinIncorrect(false);
              if (text !== '') {
                if (inp4Ref.current) {
                  (inp4Ref.current as TextInput).focus();
                }
              } else if (text === '') {
                if (inp2Ref.current) {
                  (inp2Ref.current as TextInput).focus();
                }
              }
            }}
            cursorColor={theme.colors.primary}
            selectionColor={theme.colors.primary + '90'}
          />
        </View>
        <View style={{...inputContainerStyle}}>
          <TextInput
            ref={inp4Ref}
            maxLength={1}
            style={{...inputStyle}}
            keyboardType="number-pad"
            onChangeText={text => {
              setInp4(text);
              setisPinIncorrect(false);
              if (text !== '') {
                if (inp5Ref.current) {
                  (inp5Ref.current as TextInput).focus();
                }
              } else if (text === '') {
                if (inp3Ref.current) {
                  (inp3Ref.current as TextInput).focus();
                }
              }
            }}
            cursorColor={theme.colors.primary}
            selectionColor={theme.colors.primary + '90'}
          />
        </View>
        <View style={{...inputContainerStyle}}>
          <TextInput
            ref={inp5Ref}
            maxLength={1}
            style={{...inputStyle}}
            keyboardType="number-pad"
            onChangeText={text => {
              setInp5(text);
              setisPinIncorrect(false);
              if (text === '') {
                if (inp4Ref.current) {
                  (inp4Ref.current as TextInput).focus();
                }
              }
            }}
            cursorColor={theme.colors.primary}
            selectionColor={theme.colors.primary + '90'}
          />
        </View>
      </View>
    );
  };
  const renderInputField = (): JSX.Element => {
    return (
      <>
        {isPinIncorrect && (
          <View
            style={{
              paddingBottom: 15,
            }}>
            <BodyM>Le code que vous avez entré est incorrect</BodyM>
          </View>
        )}
        {renderInputFields()}
        <View
          style={{
            paddingBottom: 15,
          }}>
          <TouchableOpacity
            disabled={resendDisabled}
            onPress={() => {
              handleResendOtp();
            }}>
            <BodyM
              style={{
                color: theme.colors.primary,
                textDecorationLine: resendDisabled ? 'none' : 'underline',
              }}>
              {resendDisabled
                ? `Code envoyé par e-mail, valable ${Math.floor(
                    countdown / 60,
                  )}:${countdown % 60 < 10 ? '0' : ''}${countdown % 60} minutes`
                : 'Renvoyer le code'}
            </BodyM>
          </TouchableOpacity>
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
        disabled={isPinIncorrect || otp.length < 5}
        iconForward={true}
        touchableOpacityStyle={{paddingHorizontal: spaces.md, width: 140}}
        title={'Suivant'}
        loading={loading}
        onPress={() => {
          handleVerify();
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
            paddingHorizontal: spaces.md,
            paddingVertical: utils.responsiveHeight(40),
          }}>
          {renderDescription()}
          {renderInputField()}
        </View>
        <View
          style={{
            paddingHorizontal: spaces.md,
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
export default VerifyOtpEmail;
