import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  TextInputProps,
} from 'react-native';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';
import {spaces} from '../constants/spaces';
export type InputFieldProps = {
  containerStyle?: object;
  onChangeText?: (text: string) => void;
  value?: string;
  check?: boolean;
  label?: string;
  loading?: boolean;
  setSecureTextEntry?: (value: boolean) => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  blurOnSubmit?: boolean;
  placeholder?: string;
  secureTextEntry?: boolean;
  eyeOffIcon?: boolean;
  checkIcon?: boolean | (() => void);
  icon?: JSX.Element;
  leftIcon?: React.ReactNode;
  innerRef?: any;
  editable?: boolean;
  maxLength?: number;
} & TextInputProps;
const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  containerStyle,
  secureTextEntry,
  keyboardType,
  checkIcon,
  setSecureTextEntry,
  autoCapitalize = 'none',
  eyeOffIcon = false,
  onChangeText,
  blurOnSubmit,
  label,
  value,
  icon,
  leftIcon,
  editable = true,
  loading,
  onBlur,
  innerRef,
  maxLength,
  style,
  ...props
}): JSX.Element | null => {
  const [focused, setFocused] = useState<boolean>(false);
  const ref = useRef<TextInput>({focus: () => {}} as TextInput);
  if (loading) {
    ref.current.blur();
  }
  return (
    <>
      <View
        style={[
          {
            ...theme.shadowStyle.shadowContainer,
            height: 50,
            borderRadius: 16,
            gap: spaces.md,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: editable
              ? theme.colors.grayLite
              : theme.colors.grayLite + 50,
            borderWidth: 1,
            paddingHorizontal: 20,
            borderColor: theme.colors.transparent,
            ...containerStyle,
          },
          style,
        ]}>
        {leftIcon}
        <TextInput
          style={{
            flex: 1,
            padding: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: eyeOffIcon ? 0 : checkIcon ? 0 : 30,
            ...components.Typography.BodyS,
            color: editable
              ? theme.colors.onBackground
              : theme.colors.onBackground + 90,
            lineHeight: 16,
          }}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.gray}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          value={value}
          ref={innerRef}
          // innerRef={innerRef}
          blurOnSubmit={blurOnSubmit}
          onBlur={onBlur}
          maxLength={maxLength}
          editable={editable}
          cursorColor={theme.colors.primary}
          selectionColor={theme.colors.primary + '90'}
          {...props}
        />
        {checkIcon && (
          <View style={{paddingHorizontal: spaces.md}}>
            <svg.Icons iconName="interface_check" />
          </View>
        )}
        {eyeOffIcon && (
          <TouchableOpacity
            style={{paddingHorizontal: spaces.md}}
            onPress={() => {
              setSecureTextEntry && setSecureTextEntry(!secureTextEntry);
            }}>
            {secureTextEntry ? (
              <svg.Icons iconName="edit_show" />
            ) : (
              <svg.Icons iconName="edit_hide" />
            )}
          </TouchableOpacity>
        )}
        {icon && (
          <TouchableOpacity
            style={{
              paddingHorizontal: spaces.md,
              paddingVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {icon}
          </TouchableOpacity>
        )}
        {label && (
          <View
            style={{
              position: 'absolute',
              top: -spaces.sm2,
              left: 10,
              paddingHorizontal: 10,
              backgroundColor: editable ? theme.colors.onPrimary : '#fff',
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontSize: 12,
                textTransform: 'uppercase',
                color: theme.colors.onBackground,
                lineHeight: 12 * 1.7,
              }}>
              {label}
            </Text>
          </View>
        )}
      </View>
    </>
  );
};
export default InputField;
