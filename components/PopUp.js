import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, TouchableWithoutFeedback, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingSection from './SettingSection'; // Assuming it's in the same folder
import { popUpStyles, navbarStyles } from '../components/styles2';

const PopUp = ({ isVisible, onClose, options, selectedPreference, onPreferenceClick, userId, selectedUserId, actionCompleted, resetAndNavigate }) => {
  const titleMap = {
    'Unmatch user': 'Are you sure you want to unmatch this user?',
    'Report user': 'Are you sure you want to report this user?',
    'Block user': 'Are you sure you want to block this user?'
  };
  const slideAnim = new Animated.Value(300);  // Initial value for bottom position

  // const finalTitle = actionCompleted ? `You have ${titleMap[selectedPreference]} <name>` : '';


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
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={actionCompleted ? resetAndNavigate : onClose}>
        <View style={popUpStyles.overlay}>
          <TouchableWithoutFeedback onPress={actionCompleted ? resetAndNavigate : () => { }}>
            <Animated.View style={[popUpStyles.container, { transform: [{ translateY: slideAnim }] }]}>
              <View style={popUpStyles.iconContainer}>
                {actionCompleted ? (
                  <Text>That was successful</Text>
                ) : selectedPreference ? (
                  <Text>{titleMap[selectedPreference]}</Text>
                ) : (
                  <Icon name="lock" size={navbarStyles.iconSize.width} color={"#000"} />
                )}
              </View>
              {actionCompleted ? (
                <SettingSection preference="OK" onPress={resetAndNavigate} />
              ) : (
                options.map((option, index) => (
                  <SettingSection
                    key={index}
                    preference={option.preference}
                    onPress={() => onPreferenceClick(option.preference, userId, selectedUserId)}
                  />
                ))
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>

      </TouchableWithoutFeedback>
    </Modal>
  );
};


export default PopUp;
