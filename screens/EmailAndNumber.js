import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { firstNameScreen, lastNameScreen, photosScreen } from './styles2';
import Icon from 'react-native-vector-icons/FontAwesome';

import Navbar from './Navbar';
import NextButton from './NextButton';

const EmailAndNumber = ({ navigation, route }) => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <View style={firstNameScreen.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <Navbar navigation={navigation} />
            <Text style={firstNameScreen.questionText}>What's your email address?</Text>
            <TextInput
                style={firstNameScreen.rectangle}
                value={email}
                onChangeText={setEmail}
                placeholder="Email Address"
                placeholderTextColor="white"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={lastNameScreen.questionText}>What's your phone number?</Text>
            <TextInput
                style={lastNameScreen.rectangle}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Phone Number"
                placeholderTextColor="white"
                keyboardType="phone-pad"
            />
            <View style={photosScreen.buttonContainer}>
                <NextButton
                    onPress={() => navigation.navigate('HeightAndWeight')}
                />
            </View>
        </View>
    );
};

export default EmailAndNumber;
