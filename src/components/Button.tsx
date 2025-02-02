import {
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, {ReactNode} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {CTAM} from './Typography';
type Props = {
  disabled?: boolean;
  iconBack?: boolean;
  iconForward?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;

  loading?: boolean;
  title: string | ReactNode;
  onPress?: () => void;
  textStyle?: TextStyle;
  transparent?: boolean;
  flat?: boolean;
  containerStyle?: ViewStyle;
  touchableOpacityStyle?: ViewStyle;
  variant?: 'primary' | 'secondary';
};
const Button: React.FC<Props> = ({
  disabled = false,
  iconLeft = false,
  iconRight = false,
  title,
  flat,
  iconBack,
  iconForward,
  loading = false,
  onPress,
  textStyle,
  containerStyle,
  transparent = false,
  touchableOpacityStyle,
  variant = 'primary',
}): JSX.Element => {
  const textColor = {
    primary: theme.colors.onPrimary,
    secondary: theme.colors.primary,
  };
  const backgroundColor = {
    primary: ['#003A9B', '#082F70'],
    secondary: ['#FFFFFF', '#FFFFFF'],
  };
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        ...(flat ? {} : theme.shadowStyle.shadowContainer),
        ...containerStyle,
      }}>
      <LinearGradient
        colors={
          iconLeft
            ? disabled
              ? ['#9CACC640', '#9CACC640']
              : ['#FFFFFF', '#FFFFFF']
            : disabled === true
            ? ['#9CACC6', '#9CACC6']
            : backgroundColor[variant]
        }
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={[styles.gradient, touchableOpacityStyle]}>
        {loading && (
          <ActivityIndicator
            color={transparent ? theme.colors.primary : theme.colors.onPrimary}
            size="small"
          />
        )}
        {!loading && (
          <>
            {iconBack && (
              <svg.Icons
                iconName="arrow_arrow_left_md"
                stroke={theme.colors.onPrimary}
              />
            )}
            {iconLeft}
            {title && (
              <CTAM
                style={[
                  styles.cta,
                  textStyle,
                  {
                    color: textColor[variant],
                  },
                ]}>
                { title }
              </CTAM>
            )}
            {iconRight}
            {iconForward && (
              <svg.Icons
                iconName="arrow_arrow_right_md"
                stroke={textColor[variant]}
              />
            )}
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};
export default React.memo(Button);

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    borderColor: theme.colors.onPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cta: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
