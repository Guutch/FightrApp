import React, { useRef, useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { swipingStyles, settingsStyles } from './styles2';

const MissedMatchAlert = () => {
    
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