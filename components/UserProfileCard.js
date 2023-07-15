import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { swipingStyles, settingsStyles } from './styles2';

const UserProfileCard = ({ user, navigation, viewOnly, pan, handlers, currentImageIndex, handleImagePress }) => {
    // const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // const handleImagePress = () => {
    //     setCurrentImageIndex((currentImageIndex + 1) % user.images.length);
    // }

    const rotate = pan?.x?.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: ["-15deg", "0deg", "15deg"],
      });

    const animatedStyle = viewOnly ? {} : {
        transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }],
      };

    const CardContainer = viewOnly ? View : Animated.View;

    return (
        <CardContainer style={[swipingStyles.cardContainer, animatedStyle]} {...(viewOnly ? {} : handlers)}>
            <Image
                source={{ uri: user.images[currentImageIndex].url }}
                style={swipingStyles.cardImage}
            />
            <View style={swipingStyles.card2}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                    <Text style={{ fontSize: 18, color: 'black' }}>{`${user.firstName}, ${(new Date().getFullYear() - new Date(user.birthday).getFullYear())}`}</Text>
                    {/* { !viewOnly &&  */}
                        <TouchableOpacity onPress={() => { navigation.navigate('ViewProfileScreen', { user }); }}>
                            <Icon name="info-circle" size={20} color="#000" />
                        </TouchableOpacity>
                    {/* }*/}
                </View>
                <Text style={{ fontSize: 18, paddingLeft: 10 }}>{`Weight: ${user.weight}`}</Text>
                <Text style={{ fontSize: 18, paddingLeft: 10 }}>{`Fighting Style: ${user.fightingStyle.join(', ')}`}</Text>
                <Text style={{ fontSize: 16, paddingLeft: 10 }}>{'xxx'}</Text>
            </View>
            <View style={swipingStyles.card1}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 1 }}>
                    <Icon name="step-backward" size={30} color="#000" />
                    <Icon name="arrow-left" size={30} color="#000" />
                    <Icon name="refresh" size={30} color="#000" />
                    <Icon name="arrow-right" size={30} color="#000" />
                    <Icon name="step-forward" size={30} color="#000" />
                </View>
            </View>
        </CardContainer>
    );
    
};

export default UserProfileCard;