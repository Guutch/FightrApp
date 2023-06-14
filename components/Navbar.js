// Navbar.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { navbarStyles } from '../components/styles2';

const Navbar = ({ navigation, showBackButton, showNextButton, onNext, homeStyle, backgroundColor, textColor, title = "Fytr" }) => {
    return (
        <View style={[navbarStyles.banner, { backgroundColor }]}>
            {homeStyle ? (
                <>
                    <Text style={[navbarStyles.fightrText, navbarStyles.backButton, { color: textColor}]}>{title}</Text>
                    <TouchableOpacity style={navbarStyles.nextButton} onPress={() => navigation.navigate('SettingsScreen')}>
                        <Icon name="cog" size={navbarStyles.iconSize.width} color={textColor} />
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    {showBackButton && (
                        <TouchableOpacity style={navbarStyles.backButton} onPress={() => navigation.goBack()}>
                            <Icon name="arrow-left" size={navbarStyles.iconSize.width} color={textColor} />
                        </TouchableOpacity>
                    )}
                    <Text style={[navbarStyles.fightrText, { color: textColor }]}>{title}</Text>
                    {showNextButton && (
                        <TouchableOpacity style={navbarStyles.nextButton} onPress={onNext}>
                            <Icon name="check" size={navbarStyles.iconSize.width} color={textColor} />
                        </TouchableOpacity>
                    )}
                </>
            )}
        </View>
    );
};

export default Navbar;