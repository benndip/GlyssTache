import React from 'react';
import {
  View,
  Text,
  ViewStyle,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {theme} from '../constants';
import {spaces} from '../constants/spaces';
interface Props {
  containerStyle?: ViewStyle; // Optional style for the container
  filters: string[];
  selectedFilter: string;
  selectFilter: (filter: string) => void;
}
const FilterButtons: React.FC<Props> = ({
  containerStyle,
  filters = [],
  selectedFilter = 'Tout',
  selectFilter = () => {},
}) => {
  return (
    <View
      style={{
        ...containerStyle,
      }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        {filters.map((filter: string, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedFilter === filter && styles.selectedButton,
            ]}
            onPress={() => selectFilter(filter)}>
            <Text
              style={[
                styles.text,
                selectedFilter === filter && styles.selectedText,
              ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: theme.colors.onPrimary,
    paddingVertical: 10,
    paddingHorizontal: spaces.md,
    borderRadius: 25,
    marginHorizontal: spaces.xs,
  },
  selectedButton: {
    backgroundColor: theme.colors.primary,
  },
  text: {
    color: '#333', // Default text color
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#FFFFFF', // White text color for selected button
  },
});
export default FilterButtons;
