// Navbar.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { navbarStyles } from '../components/styles2';
import { changeUserPreferences } from '../api'

const Navbar = ({
    navigation,
    showBackButton,
    showNextButton,
    onNext,
    homeStyle,
    backgroundColor,
    textColor,
    title = "Fytr",
    dataToUpdate,
    handleBackPressPrefSel,
  }) => {
    return (
      <View style={[navbarStyles.banner, { backgroundColor }]}>
        {homeStyle ? (
          <>
            <Text
              style={[navbarStyles.fightrText, navbarStyles.backButton, { color: textColor }]}>
              {title}
            </Text>
            <View style={navbarStyles.iconContainer}>
  <TouchableOpacity style={[navbarStyles.homeNextButton, { marginRight: 15 }]} onPress={() => navigation.navigate('SomeScreen')}>
    <Icon name="bell" size={navbarStyles.iconSize.width} color={textColor} />
  </TouchableOpacity>
  <TouchableOpacity style={navbarStyles.homeNextButton} onPress={() => navigation.navigate('SettingsScreen')}>
    <Icon name="cog" size={navbarStyles.iconSize.width} color={textColor} />
  </TouchableOpacity>
</View>

            
          </>
        ) : (
          <>
            {showBackButton && !dataToUpdate && (
      <TouchableOpacity
        style={navbarStyles.backButton}
        onPress={handleBackPressPrefSel || (() => navigation.goBack())} // Use the custom handler if provided, otherwise use the default behavior
      >
        <Icon name="arrow-left" size={navbarStyles.iconSize.width} color={textColor} />
      </TouchableOpacity>
    )}
            {showBackButton && dataToUpdate && (
              <TouchableOpacity
                style={navbarStyles.backButton}
                onPress={async () => {
                  await changeUserPreferences(dataToUpdate.userId, dataToUpdate);
                  navigation.goBack();
                }}
              >
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