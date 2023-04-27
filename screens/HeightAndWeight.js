import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { firstNameScreen, lastNameScreen, photosScreen, heightWeightScreen } from './styles2';

import Navbar from './Navbar';
import NextButton from './NextButton';

const HeightAndWeight = ({ navigation, route }) => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [heightUnit, setHeightUnit] = useState('cm');
    const [weightUnit, setWeightUnit] = useState('kg');

    const toggleHeightUnit = () => {
        setHeightUnit(heightUnit === 'cm' ? 'ft' : 'cm');
    };

    const toggleWeightUnit = () => {
        setWeightUnit(weightUnit === 'kg' ? 'lbs' : 'kg');
    };

    return (
        <View style={firstNameScreen.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <Navbar navigation={navigation} />
            <Text style={firstNameScreen.questionText}>How tall are you?</Text>
            <TextInput
                style={firstNameScreen.rectangle}
                value={height}
                onChangeText={setHeight}
                placeholder={`Height (${heightUnit})`}
                placeholderTextColor="white"
                keyboardType="numeric"
            />
            <TouchableOpacity onPress={toggleHeightUnit} style={heightWeightScreen.heightUnitToggle}>
                <Text style={[heightWeightScreen.unitText, heightUnit === 'cm' && heightWeightScreen.activeUnit]}>cm</Text>
                <Text style={heightWeightScreen.separator}>/</Text>
                <Text style={[heightWeightScreen.unitText, heightUnit === 'ft' && heightWeightScreen.activeUnit]}>ft</Text>
            </TouchableOpacity>
            <Text style={lastNameScreen.questionText}>What's your weight?</Text>
            <TextInput
                style={lastNameScreen.rectangle}
                value={weight}
                onChangeText={setWeight}
                placeholder={`Weight (${weightUnit})`}
                placeholderTextColor="white"
                keyboardType="numeric"
            />
            <TouchableOpacity onPress={toggleWeightUnit} style={heightWeightScreen.weightUnitToggle}>
                <Text style={[heightWeightScreen.unitText, weightUnit === 'kg' && heightWeightScreen.activeUnit]}>kg</Text>
                <Text style={heightWeightScreen.separator}>/</Text>
                <Text style={[heightWeightScreen.unitText, weightUnit === 'lbs' && heightWeightScreen.activeUnit]}>lbs</Text>
            </TouchableOpacity>
            <View style={photosScreen.buttonContainer}>
                <NextButton
                    onPress={() => navigation.navigate('Birthday')} // Replace 'NextScreen' with the name of the next screen in your navigation flow
                />
            </View>
        </View>
    );
};

export default HeightAndWeight;
