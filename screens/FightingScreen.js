import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fightingStyleScreen } from './styles2';
// import styles from './styles';

const FightingScreen = ({ navigation }) => {
    return (
        <View style={fightingStyleScreen.fightingstylecontainer}>
            <Text style={fightingStyleScreen.fightingstylefightrText}>Fightr.</Text>
            <Text style={fightingStyleScreen.fightingstylesubtitle}>
                What fighting styles are you interested in?{'\n'}Tick at least one.
            </Text>
            <View style={fightingStyleScreen.fightingstylerectangle}>
                <Text style={fightingStyleScreen.textStyle}>Boxing</Text>
                <View style={fightingStyleScreen.innerRectangle}></View>
            </View>
            <View style={[fightingStyleScreen.fightingstylerectangle, { top: 288 }]}>
                <Text style={fightingStyleScreen.textStyle}>Muay Thai</Text>
                <View style={fightingStyleScreen.innerRectangle}></View>
            </View>
            <View style={[fightingStyleScreen.fightingstylerectangle, { top: 359 }]}>
                <Text style={fightingStyleScreen.textStyle}>Wing Chun</Text>
                <View style={fightingStyleScreen.innerRectangle}></View>
            </View>
            <View style={[fightingStyleScreen.fightingstylerectangle, { top: 430 }]}>
                <Text style={fightingStyleScreen.textStyle}>Kick-Boxing</Text>
                <View style={fightingStyleScreen.innerRectangle}></View>
            </View>

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
