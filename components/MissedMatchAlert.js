import React, { useRef, useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { swipingStyles, settingsStyles } from './styles2';

const MissedMatchAlert = ({ isVisible, onDismiss }) => {
    // useEffect(() => {
    //   if (isVisible) {
    //     const timer = setTimeout(() => {
    //       onDismiss();
    //     }, 2000); // 2000 milliseconds = 2 seconds
  
    //     // Clean up the timer when the component is unmounted or if isVisible changes
    //     return () => clearTimeout(timer);
    //   }
    // }, [isVisible, onDismiss]);
    return (
        <View style={swipingStyles.missedMatchAlert}>
            <Text style={swipingStyles.missedMatchAlertTitle}>
                {"You just missed a match!"}
            </Text>
            <Text style={swipingStyles.missedMatchAlertSubtitle}>
                {"Use the reverse button to find them again!"}
            </Text>
        </View>
    );
};

export default MissedMatchAlert;