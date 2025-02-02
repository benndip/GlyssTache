import React from 'react';
import {View, ScrollView} from 'react-native';

import {hooks} from '../../hooks';
import {utils} from '../../utils';
import {items} from '../../items';
import {svg} from '../../assets/svg';
import {theme} from '../../constants';
import {components} from '../../components';
import {spaces} from '../../constants/spaces';

const Profile: React.FC = () => {
  const navigation = hooks.useAppNavigation();
  const user = hooks.useAppSelector(state => state.authSlice.user);
  const renderMenu = (): JSX.Element => {
    return (
      <View
        style={{
          paddingHorizontal: spaces.md,
        }}>
        <View
          style={{
            marginBottom: 20,
            borderRadius: 16,
            overflow: 'hidden',
          }}>
          <items.ProfileItem
            containerStyle={{borderBottomWidth: 1}}
            title="Informations personnelles"
            onPress={() => {
              navigation.navigate('LogOut');
            }}
            icon={<svg.Icons iconName="user_user_circle" />}
          />
          <items.ProfileItem
            containerStyle={{borderBottomWidth: 0}}
            title="A propos de moi"
            onPress={() => {
              navigation.navigate('LogOut');
            }}
            icon={<svg.Icons iconName="user_user_card_id" />}
          />
        </View>
        <View
          style={{
            marginBottom: 20,
            borderRadius: 16,
            overflow: 'hidden',
          }}>
          <items.ProfileItem
            containerStyle={{borderBottomWidth: 1}}
            title="Politique de confidentialité"
            onPress={() => {
              navigation.navigate('LogOut');
            }}
            icon={<svg.Icons iconName="interface_book" />}
          />
          <items.ProfileItem
            containerStyle={{borderBottomWidth: 1}}
            title="Condition d’utilisation Glyss"
            onPress={() => {
              navigation.navigate('LogOut');
            }}
            icon={<svg.Icons iconName="system_window_check" />}
          />
          <items.ProfileItem
            containerStyle={{borderBottomWidth: 1}}
            title="Mentions légales"
            onPress={() => {
              navigation.navigate('LogOut');
            }}
            icon={<svg.Icons iconName="interface_main_component" />}
          />
          <items.ProfileItem
            containerStyle={{borderBottomWidth: 0}}
            title="À propos"
            onPress={() => {
              navigation.navigate('LogOut');
            }}
            icon={<svg.Icons iconName="system_keyboard" />}
          />
        </View>
        <components.Button
          iconForward={true}
          title={'Se déconnecter'}
          containerStyle={{paddingTop: 20}}
          touchableOpacityStyle={{backgroundColor: theme.colors.primary}}
          textStyle={{color: theme.colors.onPrimary}}
          onPress={() => {
            navigation.navigate('LogOut');
          }}
        />
      </View>
    );
  };
  const renderContent = (): JSX.Element => {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: spaces.xl,
          paddingBottom: utils.responsiveHeight(20),
          backgroundColor: theme.colors.background,
        }}
        showsVerticalScrollIndicator={false}>
        {renderMenu()}
      </ScrollView>
    );
  };
  return renderContent();
};
export default Profile;
