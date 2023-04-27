// NextButton.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { photosScreen } from './styles2';

const NextButton = ({ onPress }) => {
    return (
        <View style={photosScreen.buttonContainer}>
            <TouchableOpacity style={photosScreen.nextButton} onPress={onPress}>
                {/* <Text style={photosScreen.nextButtonText}>Next</Text> */}
                <Icon name="arrow-right" size={30} color="#000" />
            </TouchableOpacity>
        </View>
    );
};

export default NextButton;
