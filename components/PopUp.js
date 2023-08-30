import  React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, TouchableWithoutFeedback, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingSection from './SettingSection'; // Assuming it's in the same folder
import { popUpStyles, navbarStyles } from '../components/styles2';

const PopUp = ({ isVisible, onClose, options }) => {
  const slideAnim = new Animated.Value(300);  // Initial value for bottom position

  useEffect(() => {
    if (isVisible) {
      Animated.timing(
        slideAnim,
        {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }
      ).start();
    } else {
      Animated.timing(
        slideAnim,
        {
          toValue: 300,
          duration: 500,
          useNativeDriver: true,
        }
      ).start();
    }
  }, [isVisible]);

  return (
    <Modal
      animationType="none"  // Changed to 'none'
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={popUpStyles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <Animated.View style={[popUpStyles.container, { transform: [{ translateY: slideAnim }] }]}>
              <View style={popUpStyles.iconContainer}>
              <Icon name="lock" size={navbarStyles.iconSize.width} color={"#000"} />
              </View>
              {options.map((option, index) => (
                <SettingSection key={index} preference={option.preference} />
              ))}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};


export default PopUp;
