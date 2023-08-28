import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import Navbar from '../../components/Navbar';
import MatchesDisplay from '../../components/MatchesDisplay';
import { settingsStyles, matchedUsersInterface, photosScreen } from '../../components/styles2';

const MessagingScreen = ({ navigation }) => {
 
  
  const [matches, setMatches] = useState([
    { id: '1', firstName: 'Alice', image: 'https://fightr.s3.eu-west-2.amazonaws.com/1690212638534-a4e2a195-e134-4005-a273-0f7eee79ccb2.jpg' },
    { id: '2', firstName: 'Bob', image: 'https://fightr.s3.eu-west-2.amazonaws.com/1690212638534-a4e2a195-e134-4005-a273-0f7eee79ccb2.jpg' },
  ]);

  
  
  const [messages, setMessages] = useState([
      { id: '1', sender: 'Alice', message: 'Hey, how are you?', profilePicture: 'https://fightr.s3.eu-west-2.amazonaws.com/1690212638534-a4e2a195-e134-4005-a273-0f7eee79ccb2.jpg' },
      { id: '2', sender: 'Bob', message: 'What are you up to?', profilePicture: 'https://fightr.s3.eu-west-2.amazonaws.com/1690212638534-a4e2a195-e134-4005-a273-0f7eee79ccb2.jpg' },
      // ... more dummy data
  ]);
  

  const renderItem = ({ item }) => (
    <View style={matchedUsersInterface.messageItem}>
      <Image source={{uri: item.profilePicture}} style={matchedUsersInterface.profilePicture} />
      <View>
        <Text style={matchedUsersInterface.senderName}>{item.sender}</Text>
        <Text numberOfLines={1} style={matchedUsersInterface.lastMessage}>{item.message}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Navbar navigation={navigation} backgroundColor="#FFFFFF" textColor="#000000" homeStyle={true} />
      <View style={matchedUsersInterface.mainContainer}>
        {/* Scenario 1: No matches & No messages */}
        {!matches && !messages && (
          <View style={matchedUsersInterface.centeredTextContainer}>
            <Text style={matchedUsersInterface.mainText}>Get To Swiping</Text>
            <Text style={matchedUsersInterface.subText}>Messages and Matches will show up here</Text>
          </View>
        )}
  
        {/* Scenario 2: Match(es) & No messages */}
        {matches && !messages && (
  <View style={{ flex: 1 }}>
    <MatchesDisplay matches={matches} navigation={navigation} />
    <View style={{ flex: 0.7 }}>
      <Text style={settingsStyles.sectionTitle}>Messages</Text>
      <View style={matchedUsersInterface.centeredTextContainer}>
        <Text style={matchedUsersInterface.mainText}>No Messages</Text>
        <Text style={matchedUsersInterface.subText}>Start a conversation</Text>
      </View>
    </View>
  </View>
)}

{/* Scenario 3: Match(es) & message(s) */}
{matches && messages && (
  <View style={{ flex: 1 }}>
    <MatchesDisplay matches={matches} navigation={navigation} />
    <View style={{ flex: 0.7 }}>
      <Text style={settingsStyles.sectionTitle}>Messages</Text>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  </View>
)}

      </View>
    </View>
  );
  

};

export default MessagingScreen;
