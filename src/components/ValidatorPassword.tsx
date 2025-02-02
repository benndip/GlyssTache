import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {BodyM} from './Typography';
import {spaces} from '../constants/spaces';
interface ValidatorPasswordProps {
  password: string;
}
interface SvgComponentProps extends SvgProps {}
const SvgIcon: React.FC<{valid: boolean} & SvgComponentProps> = ({
  valid,
  ...props
}) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 1.5C6.15 1.5 1.5 6.15 1.5 12S6.15 22.5 12 22.5 22.5 17.85 22.5 12 17.85 1.5 12 1.5zM12 21c-4.95 0-9-4.05-9-9s4.05-9 9-9 9 4.05 9 9-4.05 9-9 9z"
      fill={valid ? '#4E9355' : '#DD5454'}
    />
    {valid ? (
      <>
        <Path stroke="#4E9355" strokeWidth={1.5} d="M7.53 11.47L11.53 15.47" />
        <Path stroke="#4E9355" strokeWidth={1.5} d="M10.47 15.47L17.47 8.47" />
      </>
    ) : (
      <Path
        d="M16.05 17.25L12 13.2l-4.05 4.05-1.2-1.2L10.8 12 6.75 7.95l1.2-1.2L12 10.8l4.05-4.05 1.2 1.2L13.2 12l4.05 4.05-1.2 1.2z"
        fill="#DD5454"
      />
    )}
  </Svg>
);
const ValidatorPassword: React.FC<ValidatorPasswordProps> = ({password}) => {
  const criteria = [
    {check: password.length >= 8, label: 'Minimum 8 caractères'},
    {
      check: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      label: 'Minimum 1 caractère spécial',
    },
    {check: /\d/.test(password), label: 'Minimum 1 chiffre'},
  ];
  return password.length >= 8 ? (
    <View style={styles.container}>
      {criteria.map((criterion, index) => (
        <View key={index} style={styles.criterion}>
          <SvgIcon valid={criterion.check} style={styles.icon} />
          <BodyM style={criterion.check ? styles.valid : styles.invalid}>
            {criterion.label}
          </BodyM>
        </View>
      ))}
    </View>
  ) : null;
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  criterion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spaces.xs,
  },
  icon: {
    marginRight: 10,
  },
  valid: {
    color: '#4E9355',
  },
  invalid: {
    color: '#DD5454',
  },
});
export default ValidatorPassword;
