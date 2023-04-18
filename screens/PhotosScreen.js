import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { photosScreen } from './styles2';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const Photos = ({ navigation }) => {
    return (
        <View style={photosScreen.photoscontainer}>
            <View style={photosScreen.headerContainer}>
                <Text style={photosScreen.photosfightrText}>Fightr.</Text>
                <Text style={photosScreen.photosaddPhotosText}>
                    Add some photos{'\n'}Let 'em know who they're messing with!
                </Text>
            </View>
            {/* <View style={photosScreen.photosrectanglesContainer}>
                <View style={photosScreen.photosrectangle} />
                <View style={photosScreen.photosrectangle} />
                <View style={photosScreen.photosrectangle} />
                <View style={photosScreen.photosrectangle} />
                <View style={photosScreen.photosrectangle} />
                <View style={photosScreen.photosrectangle} />
            </View> */}
            <View style={photosScreen.photosrectanglesContainer}>
                <View style={photosScreen.photosrectangle}>
                    {/* <FontAwesome5 name="expand-arrows-alt" size={30} color="black" style={photosScreen.icon} /> */}
                    <FontAwesome name="plus" size={30} color="black" style={photosScreen.icon} />
                </View>
                <View style={photosScreen.photosrectangle}>
                    <FontAwesome name="camera" size={30} color="black" style={photosScreen.icon} />
                </View>
                <View style={photosScreen.photosrectangle}>
                    <FontAwesome name="camera" size={30} color="black" style={photosScreen.icon} />
                </View>
                <View style={photosScreen.photosrectangle}>
                    <FontAwesome name="camera" size={30} color="black" style={photosScreen.icon} />
                </View>
                <View style={photosScreen.photosrectangle}>
                    <FontAwesome name="camera" size={30} color="black" style={photosScreen.icon} />
                </View>
                <View style={photosScreen.photosrectangle}>
                    <FontAwesome name="camera" size={30} color="black" style={photosScreen.icon} />
                </View>
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
