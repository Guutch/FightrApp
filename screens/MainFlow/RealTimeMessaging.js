import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import Navbar from '../../components/Navbar';
import PopUp from '../../components/PopUp';
import ChatMessage from '../../components/ChatMessage';
import { matchedUsersInterface } from '../../components/styles2';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage as sendMessageAction } from '../../redux/actions';

const RealTimeMessaging = ({ route, navigation }) => {
    const { selectedUser, relevantMessages } = route.params;
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);  // New state to hold messages

    const dispatch = useDispatch();

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    const handleSendMessage = () => {
        dispatch(sendMessageAction(message));
        setChatMessages([...chatMessages, { message, isSent: true }]);  // Update the messages state
        setMessage('');
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
          <FlatList
    data={chatMessages}
    renderItem={({ item }) => <ChatMessage message={item.message} isSent={item.isSent} />}
    keyExtractor={(item, index) => index.toString()}
    contentContainerStyle={{ flex: 1, justifyContent: 'flex-end' }}  // Apply the style here
/>

            </View>

            <View style={matchedUsersInterface.textInputContainer}>
                <TextInput
                    style={matchedUsersInterface.textInput}
                    placeholder="Type a message..."
                    value={message}
                    onChangeText={text => setMessage(text)}
                    onSubmitEditing={handleSendMessage}
                />
                <Text
                    style={matchedUsersInterface.sendText}
                    onPress={handleSendMessage}
                >
                    SEND
                </Text>
            </View>
        </View>
    );
};

export default RealTimeMessaging;
