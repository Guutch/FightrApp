import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingSection from './SettingSection'; // Assuming it's in the same folder

const PopUp = ({ isVisible, onClose, options }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={{ /* your styling for the modal container */ }}>
        <Icon name="lock" size={30} color="#000" />
        {options.map((option, index) => (
          <SettingSection key={index} preference={option.preference} />
        ))}
        <TouchableOpacity onPress={onClose}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PopUp;
