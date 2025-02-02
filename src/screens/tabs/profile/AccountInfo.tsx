import React, {useEffect, useRef, useState} from 'react';
import ProfileLayout from '../../../components/profile/ProfileLayout';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
  TextInput,
} from 'react-native';
import {useSelector} from 'react-redux';

import {BodyL, H3} from '../../../components/Typography';
import InputField from '../../../custom/InputField';
import {RootState} from '../../../store';
import {spaces} from '../../../constants/spaces';
import Icons from '../../../assets/svg/Icons';
import useProfile from '../../../hooks/profile/useProfile';
import useUpdateProfile from '../../../hooks/profile/useUpdateProfile';
import Button from '../../../components/Button';
import {colors} from '../../../constants/colors';

export default function AccountInfo() {
  const customer = useSelector((state: RootState) => state.authSlice.user);

  const {
    profile,
    loadingProfile,
    refetchProfile,
    refetchingProfile,
    profileLoaded,
    profileError,
  } = useProfile();

  const firstNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const pseudoRef = useRef<TextInput>(null);

  const [firstName, setFirstName] = useState(profile?.firstName || '');
  const [lastName, setLastName] = useState(profile?.lastName || '');
  const [pseudo, setPseudo] = useState(profile?.pseudo || '');

  const {updateProfile, isUpdating, profileUpdated, updateError} =
    useUpdateProfile(() => {});

  const isDiff =
    profile?.firstName !== firstName ||
    profile?.lastName !== lastName ||
    profile?.pseudo !== pseudo;

  const handleSubmit = () => {
    if (!profile) return;

    firstNameRef.current?.blur();
    lastNameRef.current?.blur();
    pseudoRef.current?.blur();

    updateProfile({
      ...profile,
      firstName,
      lastName,
      pseudo,
    });
  };

  useEffect(() => {
    if (profileUpdated || profileLoaded) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setPseudo(profile.pseudo);
    }
  }, [
    profileUpdated,
    profileLoaded,
    profile.firstName,
    profile.lastName,
    profile.pseudo,
  ]);

  if (loadingProfile) {
    return (
      <ProfileLayout title="Informations personnelles">
        <ActivityIndicator />
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout
      title="Informations personnelles"
      refreshControl={
        <RefreshControl
          refreshing={refetchingProfile}
          onRefresh={refetchProfile}
        />
      }>
      {profileError && (
        <BodyL style={styles.error}>Impossible de récupérer votre profil</BodyL>
      )}
      <View style={styles.inputContainer}>
        <H3>Nom</H3>
        <InputField
          icon={<Icons iconName="edit_edit_pencil_01" />}
          value={lastName}
          onChangeText={text => setLastName(text)}
          innerRef={lastNameRef}
          placeholder="Nom"
        />
      </View>
      <View style={styles.inputContainer}>
        <H3>Prénom</H3>
        <InputField
          icon={<Icons iconName="edit_edit_pencil_01" />}
          value={firstName}
          onChangeText={text => setFirstName(text)}
          innerRef={firstNameRef}
          placeholder="Prénom"
        />
      </View>
      <View style={styles.inputContainer}>
        <H3>Pseudo</H3>
        <InputField
          icon={<Icons iconName="edit_edit_pencil_01" />}
          value={pseudo}
          onChangeText={text => setPseudo(text)}
          innerRef={pseudoRef}
          placeholder="Pseudo"
        />
      </View>
      <View style={styles.inputContainer}>
        <H3>Email</H3>
        <InputField
          value={customer?.email}
          placeholder="Email"
          editable={false}
        />
      </View>

      {updateError && (
        <BodyL style={[styles.error, styles.updateError]}>
          Impossible de mettre à jour votre profil
        </BodyL>
      )}
      <Button
        onPress={handleSubmit}
        loading={isUpdating}
        disabled={isUpdating || !isDiff}
        title="Sauvegarder"
      />

      <View style={styles.footer} />
    </ProfileLayout>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: spaces.sm,
    marginBottom: spaces.lg,
  },
  footer: {
    height: 50,
  },
  error: {
    color: colors.error,
    marginBottom: spaces.lg,
  },
  updateError: {
    textAlign: 'center',
    marginTop: spaces.md,
  },
});
