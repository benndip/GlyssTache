import React, {PropsWithChildren} from 'react';
import {View, TextInput, ScrollView, StyleSheet, TextStyle} from 'react-native';
import {utils} from '../../utils';
import {custom} from '../../custom';
import {theme} from '../../constants';
import {components} from '../../components';
import {BodyM, H2} from '../../components/Typography';
import {spaces} from '../../constants/spaces';
import {InputFieldProps} from '../../custom/InputField';

type Props = PropsWithChildren<{
  title: string;
  description?: string;
  value: string;
  descriptionStyle?: TextStyle;
  nextButtonTitle?: string;
  backButtonTitle?: string;
  inputRef?: React.RefObject<TextInput>;
  nextButtonDisabled?: boolean;
  nextButtonLoading?: boolean;
  onChangeText(s: string): void;
  onNextPress(): void;
  onBackPress(): void;
}> &
  InputFieldProps;
export default function OnboardingForm({
  title,
  description,
  value,
  onChangeText,
  onNextPress,
  onBackPress,
  inputRef,
  placeholder,
  descriptionStyle,
  keyboardType,
  nextButtonTitle,
  containerStyle,
  backButtonTitle,
  nextButtonDisabled,
  nextButtonLoading,
  children,
  ...props
}: Props) {
  return (
    <custom.SafeAreaView
      style={styles.safeArea}
      statusBarStyle="dark-content"
      statusBarColor={theme.colors.background}
      insets={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.contentContainer}>
          <H2 numberOfLines={1}>{title}</H2>
          {!!description?.length && (
            <BodyM style={[{marginTop: spaces.lg}, descriptionStyle]}>
              {description}
            </BodyM>
          )}
          <custom.InputField
            value={value}
            innerRef={inputRef}
            placeholder={placeholder}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            containerStyle={{...styles.inputField, ...containerStyle}}
            {...props}
          />
          {children}
        </View>
        <View style={styles.buttonContainer}>
          <components.Button
            iconBack={true}
            touchableOpacityStyle={styles.backButton}
            title={backButtonTitle ?? ''}
            onPress={onBackPress}
          />
          <components.Button
            disabled={nextButtonDisabled}
            iconForward={true}
            touchableOpacityStyle={styles.nextButton}
            title={nextButtonTitle ?? 'Suivant'}
            loading={nextButtonLoading}
            onPress={onNextPress}
          />
        </View>
      </ScrollView>
    </custom.SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.background,
  },
  scrollViewContent: {
    flexGrow: 1,
    maxWidth: '100%',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: utils.responsiveHeight(70),
  },
  contentContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: spaces.md,
    paddingVertical: utils.responsiveHeight(40),
  },
  inputField: {
    borderColor: theme.colors.transparent,
    marginVertical: spaces.lg,
  },
  buttonContainer: {
    paddingHorizontal: spaces.md,
    paddingVertical: utils.responsiveHeight(40),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  backButton: {
    paddingHorizontal: spaces.md,
    width: 80,
    backgroundColor: theme.colors.grayLite,
  },
  nextButton: {
    paddingHorizontal: spaces.md,
    width: 140,
  },
});
