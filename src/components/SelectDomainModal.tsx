import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Domain} from '../types';
import {theme} from '../constants';
import {spaces} from '../constants/spaces';

interface SelectDomainModalProps {
  visible: boolean;
  onClose: () => void;
  domains: Domain[];
  selectedDomain: Domain | null;
  loadingDomainList: boolean;
  onSelectDomain: (domain: Domain) => void;
}

export default function SelectDomainModal({
  visible,
  onClose,
  domains,
  selectedDomain,
  loadingDomainList,
  onSelectDomain,
}: SelectDomainModalProps) {
  const handleDomainSelect = (domain: Domain) => {
    onSelectDomain(domain);
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
            <Text style={styles.title}>Choisissez votre domaine</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {loadingDomainList ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={domains}
              keyExtractor={(_, index) => `${index}`}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.domainItem}
                  onPress={() => handleDomainSelect(item)}>
                  <Text
                    style={[
                      styles.domainText,
                      selectedDomain?.id === item.id &&
                        styles.selectedDomainText,
                    ]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
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
    paddingVertical: spaces.sm2,
    paddingHorizontal: spaces.md,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  domainText: {
    fontSize: 16,
  },
  selectedDomainText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});
