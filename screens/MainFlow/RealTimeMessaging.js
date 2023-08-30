import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import Navbar from '../../components/Navbar';
import PopUp from '../../components/PopUp';
import ChatMessage from '../../components/ChatMessage';
import { matchedUsersInterface } from '../../components/styles2';

const RealTimeMessaging = ({ route, navigation }) => {
    const { selectedUser, relevantMessages } = route.params;
    const [isPopupVisible, setPopupVisible] = useState(false);

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Navbar navigation={navigation}
                title={selectedUser.firstName}
                backgroundColor="#000000"
                textColor="#FFFFFF"
                showLockIcon={true}
                onLockPress={togglePopup}
                showBackButton={true}
            />
            <PopUp
                isVisible={isPopupVisible}
                onClose={togglePopup}
                options={[
                    { preference: 'Unmatch user' },
                    { preference: 'Report user' },
                    { preference: 'Block user' }
                ]}
            />
            <View style={[matchedUsersInterface.mainContainer, { justifyContent: 'flex-end' }]}>
  <ChatMessage message="Hey, how are you?" isSent={false} />
  <ChatMessage message="Hello from User" isSent={true} />
</View>
            <View style={matchedUsersInterface.textInputContainer}>
                <TextInput
                    style={matchedUsersInterface.textInput}
                    placeholder="Type a message..."
                />
                <Text style={matchedUsersInterface.sendText}>SEND</Text>
            </View>
        </View>
    );
};

export default RealTimeMessaging;