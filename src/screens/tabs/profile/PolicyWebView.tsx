import React from 'react';
import {ProfileStackParamList} from '../../../types/navigation';
import {WebView} from 'react-native-webview';
import {colors} from '../../../constants/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, StyleSheet} from 'react-native';
import {H2} from '../../../components/Typography';
import {spaces} from '../../../constants/spaces';

export default function PolicyWebView({
  route,
}: NativeStackScreenProps<ProfileStackParamList, 'PolicyWebView'>) {
  return (
    <View style={styles.container}>
      <WebView
        source={{uri: route.params?.url}}
        style={styles.webview}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginVertical: spaces.xxl,
    marginHorizontal: spaces.md,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  webview: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
