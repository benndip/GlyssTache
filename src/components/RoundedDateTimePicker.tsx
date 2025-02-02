import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {theme} from '../constants';
import {spaces} from '../constants/spaces';
const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
interface RoundedDateTimePickerProps {
  onChange?: (formattedDate: string) => void; // Callback prop accepting a string
  editable?: boolean;
}
const RoundedDateTimePicker: React.FC<RoundedDateTimePickerProps> = ({
  onChange,
  editable = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>('JJ/MM/AAAA');
  const showDatePicker = () => {
    setIsVisible(true);
  };
  const hideDatePicker = () => {
    setIsVisible(false);
  };
  const handleConfirm = (selectedDate: Date) => {
    const dateString = formatDate(selectedDate);
    setDate(selectedDate);
    setFormattedDate(dateString);
    hideDatePicker();
    // Call the onChange prop with the formatted date string if provided
    if (onChange) {
      onChange(dateString);
    }
  };
  const textColor = date ? theme.colors.primary : theme.colors.gray;
  return (
    <View
      style={{
        ...theme.shadowStyle.shadowContainer,
        ...styles.container,
      }}>
      <TouchableOpacity
        onPress={showDatePicker}
        style={{flex: 1}}
        disabled={!editable}>
        <View style={styles.date}>
          <Text style={[styles.inputText, {color: textColor}]}>
            {formattedDate}
          </Text>
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  inputText: {
    flex: 1,
    fontSize: 14,
  },
  container: {
    height: 50,
    borderRadius: spaces.md,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.grayLite,
    borderWidth: 1,
    borderColor: theme.colors.transparent,
  },
  date: {
    flex: 1,
    padding: spaces.md,
  },
});
export default RoundedDateTimePicker;
