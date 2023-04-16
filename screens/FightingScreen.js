import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {fightingStyleScreen} from './styles2';
// import styles from './styles';

const FightingScreen = ({ navigation }) => { 
    return (
        <View style={fightingStyleScreen.fightingstylecontainer}>
            <Text style={fightingStyleScreen.fightingstylefightrText}>Fightr.</Text>
            <Text style={fightingStyleScreen.fightingstylesubtitle}>
                What fighting styles are you interested in?{'\n'}Tick at least one.
            </Text>
            <View style={fightingStyleScreen.fightingstylerectangle} />
            <View style={[fightingStyleScreen.fightingstylerectangle, { top: 288 }]} />
            <View style={[fightingStyleScreen.fightingstylerectangle, { top: 359 }]} />
            <View style={[fightingStyleScreen.fightingstylerectangle, { top: 430 }]} />
            <View style={fightingStyleScreen.fightingstylebuttonsContainer}>
                <TouchableOpacity
                    style={fightingStyleScreen.fightingstylebutton}
                    onPress={() => navigation.navigate('Photos')}
                >
                    <Text style={fightingStyleScreen.fightingstylebuttonText}>Go to Photos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={fightingStyleScreen.fightingstylebutton}
                    onPress={() => navigation.navigate('FightingLevelScreen')}
                >
                    <Text style={fightingStyleScreen.fightingstylebuttonText}>Go to FightingLevel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default FightingScreen;
