import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';

import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {theme} from '../constants';
import {components} from '../components';
import {actions} from '../store/actions';
import {H2, BodyM} from '../components/Typography';
import {spaces} from '../constants/spaces';

const LogOut: React.FC = () => {
  const dispatch = hooks.useAppDispatch();
  const navigation = hooks.useAppNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const renderDescription = (): JSX.Element => {
    return (
      <H2 style={{marginBottom: utils.responsiveHeight(15)}} numberOfLines={4}>
        Se déconnecter
      </H2>
    );
  };
  const renderInputField = (): JSX.Element => {
    return (
      <View
        style={{
          paddingBottom: 15,
        }}>
        <BodyM>Êtes-vous sûr de vouloir vous déconnecter ?</BodyM>
      </View>
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
        }}>
        <View
          style={{
            width: '100%',
            flex: 1,
            paddingHorizontal: utils.responsiveHeight(20),
            paddingVertical: utils.responsiveHeight(40),
          }}>
          {renderDescription()}
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
        iconForward={true}
        touchableOpacityStyle={{paddingHorizontal: spaces.md, width: 200}}
        title={'Se déconnecter'}
        loading={loading}
        onPress={() => {
          dispatch(actions.logOut());
        }}
      />
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
export default LogOut;
