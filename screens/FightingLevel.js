import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {fightingStyleScreen} from './styles2';

const FightingLevelScreen = ({ navigation }) => { 
    return (
        <View style={fightingStyleScreen.fightingstylecontainer}>
            <Text style={fightingStyleScreen.fightingstylefightrText}>Fightr.</Text>
            <Text style={fightingStyleScreen.fightingstylesubtitle}>
            How good are you?{'\n'}This may determine the partners you find
            </Text>
            <View style={fightingStyleScreen.fightingstylerectangle} />
            <View style={[fightingStyleScreen.fightingstylerectangle, { top: 288 }]} />
            <View style={[fightingStyleScreen.fightingstylerectangle, { top: 359 }]} />
            <View style={[fightingStyleScreen.fightingstylerectangle, { top: 430 }]} />
            <View style={fightingStyleScreen.fightingstylebuttonsContainer}>
                <TouchableOpacity
                    style={fightingStyleScreen.fightingstylebutton}
                    onPress={() => navigation.navigate('FightingScreen')}
                >
                    <Text style={fightingStyleScreen.fightingstylebuttonText}>Go to FightingScreen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={fightingStyleScreen.fightingstylebutton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={fightingStyleScreen.fightingstylebuttonText}>Go to Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default FightingLevelScreen;
