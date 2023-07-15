import React, { useState } from 'react';
import { Text, StyleSheet, View, PanResponder, Animated, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {swipingStyles} from '../components/styles2';

const SwipingCard = ({ user, navigation, viewOnly, pan, handlers }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const animatedStyle = {
        transform: [
            {
                translateX: pan.x
            },
            {
                translateY: pan.y
            },
            {
                rotate: pan.x.interpolate({
                    inputRange: [-150, 0, 150],
                    outputRange: ['-30deg', '0deg', '30deg'],
                })
            }
        ],
    };

    return (
        <Animated.View style={[swipingStyles.cardContainer, animatedStyle]}>
            <Image
                {...handlers}
                source={{ uri: user.images[currentImageIndex].url }}
                style={swipingStyles.cardImage}
            />
            {/* Rest of your card UI */}
        </Animated.View>
    );
};

export default SwipingCard;