import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import styles from './styles';
import {photosScreen} from './styles2';

const Photos = ({ navigation }) => {
    return (
        <View style={photosScreen.photoscontainer}>
            <View style={photosScreen.headerContainer}>
                <Text style={photosScreen.photosfightrText}>Fightr.</Text>
                <Text style={photosScreen.photosaddPhotosText}>
                    Add some photos{'\n'}Let 'em know who they're messing with!
                </Text>
            </View>
            <View style={photosScreen.photosrectanglesContainer}>
                <View style={photosScreen.photosrectangle} />
                <View style={photosScreen.photosrectangle} />
                <View style={photosScreen.photosrectangle} />
                <View style={photosScreen.photosrectangle} />
                <View style={photosScreen.photosrectangle} />
                <View style={photosScreen.photosrectangle} />
            </View>
            <TouchableOpacity
                style={photosScreen.photosbutton}
                onPress={() => navigation.navigate('Birthday')}
            >
                <Text style={photosScreen.photosbuttonText}>Go to Birthday</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={photosScreen.photosbutton}
                onPress={() => navigation.navigate('FightingScreen')}
            >
                <Text style={photosScreen.photosbuttonText}>Go to FightingScreen</Text>
            </TouchableOpacity>

        </View>
    );
};


export default Photos;
