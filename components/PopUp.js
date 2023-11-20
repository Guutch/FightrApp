import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, TouchableWithoutFeedback, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingSection from './SettingSection'; // Assuming it's in the same folder
import { popUpStyles, navbarStyles } from '../components/styles2';

const PopUp = ({ isVisible, onClose, options, selectedPreference, onPreferenceClick, userId, selectedUserId, actionCompleted, resetAndNavigate, sexSelector, onPreferenceChange, errorMessage, screen, navigateToChat, match, navigateToViewProfile }) => {
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

  const handleRoute = (option) => {
    if (screen === "Msg") {
      console.log("Selected option:", option);

      // Now you can use the match object
      if (option === "Message") {
        navigateToChat(match);
      } else {
        // Need to add the code in here
        navigateToViewProfile(match)
      }
    } else {
      if (sexSelector = true) {
        console.log(option)
        onPreferenceChange(option);
      } else {
        onPreferenceClick(option, userId, selectedUserId)
      }
    }

  }

  return (
    // Modal component to render the popup
    <Modal
      animationType="none" // No animation for modal appearance
      transparent={true} // Modal background is transparent
      visible={isVisible} // Controls the visibility of the modal
      onRequestClose={onClose} // Callback for when the modal requests to close (e.g., hardware back button on Android)
    >
      {/* Overlay to handle closing of the modal when the area outside the popup is touched */}
      <TouchableWithoutFeedback onPress={actionCompleted ? resetAndNavigate : onClose}>
        <View style={popUpStyles.overlay}>
          {/* Prevents propagation of touch events to the overlay */}
          <TouchableWithoutFeedback onPress={actionCompleted ? resetAndNavigate : () => { }}>
            {/* Animated view for the popup container */}
            <Animated.View style={[popUpStyles.container, { transform: [{ translateY: slideAnim }] }]}>
              {/* Container for icons or messages */}
              <View style={popUpStyles.iconContainer}>
                {errorMessage ? (
                  // Display error message if present
                  <Text style={popUpStyles.errorText}>{errorMessage}</Text>
                ) : actionCompleted ? (
                  // Display a success message if an action is completed
                  <Text>That was successful</Text>
                ) : selectedPreference ? (
                  // Display message based on selected preference
                  <Text>{titleMap[selectedPreference]}</Text>
                ) : screen === 'Msg' ? (
                  // Conditionally display the handshake icon for the 'Msg' screen
                  <Icon name="handshake-o" size={navbarStyles.iconSize.width} color={"#000"} />
                ) : (
                  // Default icon to display when no specific condition is met
                  <Icon name="lock" size={navbarStyles.iconSize.width} color={"#000"} />
                )}
              </View>
              {actionCompleted ? (
                // Display a simple "OK" section for action completed, with resetAndNavigate as onPress
                <SettingSection preference="OK" onPress={resetAndNavigate} />
              ) : errorMessage ? (
                // Display a simple "OK" section for an error message, with onClose as onPress
                <SettingSection preference="OK" onPress={onClose} />
              ) : (
                // Map through options and create a SettingSection for each if no message or error
                options && options.map((option, index) => (
                  <SettingSection
                    key={index}
                    preference={option.preference}
                    onPress={() => handleRoute(option.preference)}
                  />
                ))
              )
              }

            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );


};


export default PopUp;
