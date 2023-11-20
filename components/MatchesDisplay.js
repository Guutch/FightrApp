import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { settingsStyles, matchedUsersInterface, photosScreen } from '../components/styles2';
import PopUp from './PopUp';

const MatchesDisplay = ({ matches, navigateToViewProfile, navigateToChat, navigation }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isScreenMounted, setIsScreenMounted] = useState(false);

  const options = [
    { preference: 'View Profile' },
    { preference: 'Message' }
  ];

  const togglePopup = (match) => {
    setPopupVisible(current => {
      return !current;
    });
    setSelectedMatch(match);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsScreenMounted(true);
    });
  
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (isScreenMounted) {
      setPopupVisible(false);
      setIsScreenMounted(false); // Reset the tracking state
    }
  }, [isScreenMounted]);

  return (
    <View style={{ flex: 0.3 }}>
      <PopUp
        isVisible={isPopupVisible}
        onClose={togglePopup}
        options={options}
        screen={"Msg"}
        navigateToChat={navigateToChat}
        navigateToViewProfile={navigateToViewProfile}
        match={selectedMatch} // Pass the selected match
      />
      <Text style={[settingsStyles.sectionTitle, matchedUsersInterface.matchesAndMessages, { paddingBottom: 8 }]}>Matches</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {matches.map(match => (
          <TouchableOpacity key={match.id} onPress={() => togglePopup(match)}>
            {/* <TouchableOpacity key={match.id} onPress={() => navigateToChat(match)}> */}
            <Image
              source={{ uri: match.image }}
              style={[photosScreen.photosrectangle, photosScreen.extendedPhotosRectangle]}
            // resizeMode="stretch"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MatchesDisplay;

