import {Text, StyleSheet, Pressable, SafeAreaView} from 'react-native';
import React from 'react';
import {theme} from '../../constants';
import {svg} from '../../assets/svg';
import {colors} from '../../constants/colors';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import {spaces} from '../../constants/spaces';

export default function TabBarHeader({navigation}: BottomTabHeaderProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Glyss</Text>
      <Pressable
        style={styles.iconContainer}
        onPress={() => {
          navigation.navigate('ProfileStack', {
            screen: 'Profile',
          });
        }}>
        <svg.Icon iconName="parametre" stroke={theme.colors.onPrimary} />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    backgroundColor: colors.primary,
  },

  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    margin: 'auto',
    marginBottom: 10,
  },
  iconContainer: {
    right: spaces.md,
    position: 'absolute',
    bottom: 14,
  },
});
