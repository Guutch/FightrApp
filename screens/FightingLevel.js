import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fightingStyleScreen, firstNameScreen, photosScreen } from './styles2';
import Navbar from './Navbar';
import NextButton from './NextButton';

const CheckBox = ({ isChecked, onToggle }) => (
    <TouchableOpacity
        style={[fightingStyleScreen.checkBox, isChecked && fightingStyleScreen.checked]}
        onPress={onToggle}
    />
);

const levels = [
    'Professional', 'Intermediate', 'Amateur', 'No Experience'
];

const FightingLevelScreen = ({ navigation }) => {
    const [checkedLevel, setCheckedLevel] = useState(null);

    const toggleCheckbox = (level) => {
        setCheckedLevel(checkedLevel === level ? null : level);
    };

    const renderItem = (item, index) => (
        <View
            style={[
                fightingStyleScreen.rectangle,
                index === 0 ? fightingStyleScreen.firstRectangle : null
            ]}
            key={item}
        >
            <Text style={[fightingStyleScreen.textStyle, fightingStyleScreen.rectangleText]}>{item}</Text>
            <CheckBox
                isChecked={checkedLevel === item}
                onToggle={() => toggleCheckbox(item)}
            />
        </View>
    );

    return (
        <View style={fightingStyleScreen.container}>
            <Navbar navigation={navigation} />
            <ScrollView contentContainerStyle={fightingStyleScreen.list}>
                {/* <Text style={fightingStyleScreen.fightrText}>Fightr.</Text> */}
                <Text style={firstNameScreen.questionText}>
                    How good is your fight game? This will help us match you others!
                </Text>
                {levels.map(renderItem)}
            </ScrollView>
            {/* <TouchableOpacity
        style={photosScreen.nextButton}
        onPress={() => navigation.navigate('FightingLevelScreen')}
      >
        <Text style={photosScreen.nextButtonText}>Next</Text>
      </TouchableOpacity> */}
            <NextButton
                onPress={() => navigation.navigate('Photos')}
            />
        </View>
    );
};

export default FightingLevelScreen;
