import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Level, LevelListItem } from '../types';
import { theme } from '../constants';

interface SelectLevelModalProps {
  visible: boolean;
  onClose: () => void;
  options: LevelListItem[];
  selected: Level;
  onSelect: (item) => void;
}

export default function SelectLevelModal({
  visible,
  onClose,
  options,
  selected,
  onSelect,
}: SelectLevelModalProps) {
  const handleoptionselect = (item) => {
    onSelect(item);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Choisissez votre niveau</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>


          <FlatList
            data={options}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }: { item: LevelListItem; index: number }) => (
              <TouchableOpacity
                style={[
                  styles.domainItem,
                  index === options.length - 1 && styles.lastItem, // Apply style for the last item
                ]}
                onPress={() => handleoptionselect(item)}
              >
                <Text
                  style={[
                    styles.domainText,
                    selected === item.value && styles.selectedText,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    maxHeight: '70%',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 20,
    padding: 5,
  },
  domainItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  domainText: {
    fontSize: 16,
  },
  selectedText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});
