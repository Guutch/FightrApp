// Navbar.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { navbarStyles } from '../components/styles2';

const Navbar = ({ navigation, showBackButton, showNextButton, onNext }) => {
    return (
        <View style={navbarStyles.banner}>
            {showBackButton && (
                <TouchableOpacity style={navbarStyles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={navbarStyles.iconSize.width} color="#FFFFFF" />
                </TouchableOpacity>
            )}
            <Text style={navbarStyles.fightrText}>Fytr</Text>
            {showNextButton && (
                <TouchableOpacity style={navbarStyles.nextButton} onPress={onNext}>
                    <Icon name="check" size={navbarStyles.iconSize.width} color="#FFFFFF" />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Navbar;
