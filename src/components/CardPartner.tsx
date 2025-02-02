import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import {theme} from '../constants';
import {Customer} from '../types';
import {spaces} from '../constants/spaces';

type Props = {
  containerStyle?: ViewStyle;
  partner: Customer;
  onPress: () => void;
  pressDisabled?: boolean;
};

const CardPartner: React.FC<Props> = ({
  containerStyle,
  onPress,
  pressDisabled,
  partner,
}): JSX.Element => {
  return (
    <TouchableOpacity
      style={[
        theme.shadowStyle.shadowContainer,
        styles.cardContainer,
        containerStyle,
      ]}
      onPress={onPress}
      disabled={pressDisabled}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{partner.Tag}</Text>
      </View>
      <Image
        source={{
          uri: partner.CoverURL,
        }} // Replace with the actual image URL
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{partner.Name}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {partner.ShortDescription}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: spaces.md,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: spaces.md2,
    marginHorizontal: spaces.md2,
  },
  labelContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: theme.colors.onPrimary,
    borderRadius: 20,
    paddingHorizontal: spaces.sm2,
    paddingVertical: spaces.xs,
    zIndex: 1,
  },
  labelText: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: spaces.md,
    marginBottom: spaces.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E3A59',
    marginBottom: spaces.xs,
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
});
export default CardPartner;
