import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import {spaces} from '../../constants/spaces';
import LocationItem from './LocationItem';
import {theme} from '../../constants/colors';
import {shadowStyle} from '../../constants/shadow';
import {utils} from '../../utils';
import InputField, {InputFieldProps} from '../../custom/InputField';
import Row from '../../custom/Row';

type Props<T> = {
  data: (T & {name: string})[];
  value: string;
  onItemPress: (item: T) => void;
  resetInput: () => void;
  listDisplayed: boolean;
  loading: boolean;
  placeholder: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  topItem?: React.ReactNode;
  inputProps: InputFieldProps;
  notFoundMessage: string;
  innerRef?: any;
  errorMessage: string;
};
export default function LocationDropdown<T>({
  data,
  onItemPress,
  resetInput,
  listDisplayed,
  loading,
  placeholder,
  leftIcon,
  rightIcon,
  topItem,
  inputProps,
  notFoundMessage,
  innerRef,
  value,
  errorMessage,
}: Props<T>) {
  return (
    <View style={styles.dropdownContainer}>
      <Row style={styles.subscriptionContainer}>
        {leftIcon}

        <InputField
          innerRef={innerRef}
          value={value}
          placeholder={placeholder}
          style={styles.input}
          containerStyle={{...styles.inputField}}
          {...inputProps}
        />
        {rightIcon}
      </Row>
      {listDisplayed && (
        <>
          {topItem}

          {listDisplayed && (
            <FlatList
              data={data}
              contentContainerStyle={styles.list}
              scrollEnabled={false}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                loading ? (
                  <ActivityIndicator style={{marginTop: spaces.lg}} />
                ) : (
                  <LocationItem
                    containerStyle={{justifyContent: 'center'}}
                    title={!data.length ? notFoundMessage : errorMessage}
                    iconDisplayed={false}
                    onPress={() => resetInput()}
                  />
                )
              }
              renderItem={({item}) => (
                <LocationItem
                  onPress={() => onItemPress(item)}
                  title={item.name}
                />
              )}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  input: {
    flex: 1,
    paddingHorizontal: 0,
  },
  contentContainer: {
    paddingHorizontal: spaces.md,
    paddingVertical: utils.responsiveHeight(40),
    flex: 1,
  },
  inputField: {
    borderColor: theme.colors.transparent,
    borderRadius: 0,
    flex: 1,
    shadowColor: 'transparent',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,

    elevation: 0,
  },
  dropdownContainer: {
    ...shadowStyle.shadowContainer,
    gap: 1,
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: spaces.lg,
  },
  list: {
    gap: 1,
  },
  subscriptionContainer: {
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: spaces.md,
    alignItems: 'center',
    gap: spaces.md,
    backgroundColor: theme.colors.grayLite,
    borderWidth: 1,
    borderColor: theme.colors.transparent,
  },
  subscriptionRow: {
    gap: spaces.sm,
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingVertical: utils.responsiveHeight(40),
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  nextButton: {
    paddingHorizontal: spaces.md,
    width: 140,
  },
});
