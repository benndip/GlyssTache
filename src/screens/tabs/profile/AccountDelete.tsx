import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '../../../types/navigation';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {custom} from '../../../custom';
import {components} from '../../../components';
import {useState} from 'react';
import styles from '../../../components/Typography';
import {getToken} from '../../../utils/authUtils';
import {useAppDispatch} from '../../../hooks';
import {actions} from '../../../store/actions';
import {theme} from '../../../constants/colors';

type AccountDeleteProps = NativeStackScreenProps<
  ProfileStackParamList,
  'AccountDelete'
>;
const AccountDelete: React.FC<AccountDeleteProps> = ({
  navigation,
}: AccountDeleteProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();

  async function deleteAccount() {
    const token = await getToken();
    try {
      const response = await fetch('https://api.glyss.fr/auth/v1/delete', {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status !== 200) {
        throw new Error('Mauvaise réponse');
      }

      dispatch(actions.logOut());
      return response.json();
    } catch (e) {
      Alert.alert(
        'Une erreur est survenue',
        'Veuillez vous assurez que vous êtes correctement connectés ainsi que votre email et mot de passe sont correctes.',
      );
    }
  }

  return (
    <View style={localStyles.Container}>
      <Text style={{...styles.Titleh3, ...localStyles.Title}}>
        Vous êtes sur le point de supprimer votre compte.
      </Text>
      <Text style={{...styles.LabelM, ...localStyles.Title}}>
        La suppression de votre compte est instantanée et définitive. Veuillez
        confirmer la suppression de votre compte avec votre l'email et votre mot
        de passe.
      </Text>
      <custom.InputField
        value={email}
        placeholder={'Email'}
        keyboardType={'email-address'}
        onChangeText={setEmail}
        containerStyle={{...localStyles.Elements}}
      />
      <custom.InputField
        value={password}
        placeholder={'Mot de passe'}
        keyboardType={'visible-password'}
        onChangeText={setPassword}
        secureTextEntry={true}
        containerStyle={{...localStyles.Elements}}
      />

      <components.Button
        title="Supprimer mon compte"
        variant="secondary"
        containerStyle={{...localStyles.DeleteButton}}
        onPress={deleteAccount}
      />
      <components.Button title="Annuler" onPress={() => navigation.goBack()} />
    </View>
  );
};

const localStyles = StyleSheet.create({
  Container: {
    padding: 20,
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  Title: {
    marginTop: 20,
    marginBottom: 40,
  },
  Elements: {
    marginTop: 10,
    marginBottom: 10,
  },
  DeleteButton: {
    marginTop: 30,
    marginBottom: 10,
  },
});

export default AccountDelete;
