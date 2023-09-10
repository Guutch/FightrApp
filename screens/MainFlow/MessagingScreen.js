import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import Navbar from '../../components/Navbar';
import MatchesDisplay from '../../components/MatchesDisplay';
import { settingsStyles, matchedUsersInterface, photosScreen } from '../../components/styles2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMatches, fetchImage, fetchName, fetchMessages, markMessagesAsRead } from '../../api'
import { getWebSocketInstance } from '../../Backend/websocketInstance'
import { getShouldRefresh, setShouldRefresh, setChatId, getChatId } from '../../sharedState'

const MessagingScreen = ({ navigation }) => {
  const [newMessageReceived, setNewMessageReceived] = useState(false);
  const [matches, setMatches] = useState([]);
  const [messages, setMessages] = useState([]);
  const userId = useSelector(state => state.user);
  const ws = getWebSocketInstance();
  const [readChats, setReadChats] = useState({});


  const navigateToChat = async (selectedUser, userId) => {
    setChatId(selectedUser.id);
    setReadChats(prevReadChats => ({ ...prevReadChats, [selectedUser.id]: true }));
    console.log("readChats", readChats)
    try {
      await markMessagesAsRead(selectedUser.id, userId);
    } catch (error) {
      console.error("Failed to mark messages as read:", error);
    }
    navigation.navigate('RealTimeMessaging', { selectedUser: selectedUser, userId });
  };

  ws.onmessage = async (event) => {
    // Parse the received WebSocket message
    const messageData = JSON.parse(event.data);

    console.log("messageData", messageData)

    // Check if the message type is 'new_message_notification'
    // if (messageData.type === 'new_message_notification') {
    if (messageData.type === 'chat') {
      console.log("NEW MESSAGE RECEIVED")
      // Set the flag indicating a new message has been received
      // setNewMessageReceived(true);

      setReadChats(prevReadChats => ({ ...prevReadChats, [messageData.senderId]: false }));
      setMatches(prevMatches => {
        return prevMatches.map(match => {
          if (match.id === messageData.senderId) {
            return {
              ...match,
              lastMessage: messageData.content,  // Update the last message content
              read: false  // Set read status to false as this is a new message
            };
          }
          return match;
        });
      });
    }
  };

  // ws.onmessage = (event) => {
  //   console.log("IN NEW USE EFFECT")
  //   const messageData = JSON.parse(event.data);

  //     console.log("fdfdfdd messageData", messageData)
  // };

  // useEffect(() => {
  //   // Initialize WebSocket connection
  //   console.log("IN NEW USddsdsE EFFECT")
  //   // Event listener for incoming messages
  //   ws.onmessage = (event) => {
  //     console.log("IN NEW USE EFFECT")
  //     const messageData = JSON.parse(event.data);

  //       console.log("fdfdfdd messageData", messageData)
  //   };
  
  //   // Clean up the WebSocket connection when the component unmounts
  //   // return () => {
  //   //   ws.close();
  //   // };
  // }, []);

  // First UseEffect called - Asynchronous function to fetch all necessary data
  const fetchData = async () => {
    // Fetch all matches for the current user
    const matches = await fetchAllMatches(userId.userId);

    // Extract the IDs of users that the current user has matched with
    const matchedUserIds = matches.map(match => {
      if (String(match.user1_id) === String(userId.userId)) {
        return String(match.user2_id);
      } else if (String(match.user2_id) === String(userId.userId)) {
        return String(match.user1_id);
      }
    }).filter(id => id);  // Remove any undefined values

    // Fetch additional data for each matched user
    const fetchPromises = matchedUserIds.map(async (id) => {
      // Fetch image, name, and last message concurrently
      const [imageData, nameData, lastMessage] = await Promise.all([
        fetchImage(id),
        fetchName(id),
        fetchMessages(userId.userId, id, true),  // Fetch only the last message
      ]);

      // Extract the first name from the full name
      const firstName = nameData.fullName.split(' ')[0];

      // Construct an object for each matched user
      return {
        id,
        image: imageData.imageUrl,
        name: firstName,
        lastMessage: lastMessage[0]?.content || '',  // Use the content of the last message, if available
        read: lastMessage[0]?.read || true,  // Use the read status of the last message, default to true
      };
    });

    // Wait for all fetch operations to complete and update the state
    const matchedUsersData = await Promise.all(fetchPromises);
    setMatches(matchedUsersData);
  };

  // First UseEffect called - useEffect hook to run fetchData when the component mounts
  useEffect(() => {
    fetchData();
  }, []);  // Empty dependency array ensures this runs only once after initial render


  // Used to refresh last message sent in the last chat they were in
  // useEffect hook to handle screen focus events. Will be executed whenever the user navigates to this screen from anywhere
  useEffect(() => {
    // Add a listener for the 'focus' event on the navigation object
    const focusListener = navigation.addListener('focus', () => {
      // Check if the screen should refresh when it comes into focus
      if (getShouldRefresh()) {
        if(ws) {
          console.log("ws is still there")
        } else {
          console.log("ws is not there")
        }
        // Execute an asynchronous function
        (async () => {
          // Retrieve the chat ID from the shared state
          const chatId = getChatId();

          // Fetch the last message for the specific chat
          const lastMessage = await fetchMessages(userId.userId, chatId, true);
          console.log("focusListener - Last message read status: ", lastMessage[0]?.read);  // Debugging line
          // Update the 'matches' state with the new last message for the specific chat
          setMatches(prevMatches => {
            return prevMatches.map(match => {
              if (match.id === chatId) {
                return { ...match, lastMessage: lastMessage[0]?.content || '' };
              }
              return match;
            });
          });

          // Reset the refresh flag
          setShouldRefresh(false);
        })();
      } else {
        // console.log("This is why..")
      }
    });

    // Cleanup: Remove the focus listener when the component unmounts
    return () => {
      focusListener();
    };
  }, []);  // Empty dependency array ensures this runs only once after initial render



  // This useEffect runs whenever the WebSocket instance (ws) or newMessageReceived state changes
  // useEffect(() => {
  //   // Check if the WebSocket (ws) instance exists
  //   console.log("WEBSOCKET STATE", ws ? ws.readyState : "ws is null");

  //   if (ws) {
  //     // Listen for incoming WebSocket messages
  //     // console.log("test")
  //     ws.onmessage = async (event) => {
  //       // Parse the received WebSocket message
  //       const messageData = JSON.parse(event.data);

  //       console.log("messageData", messageData)

  //       // Check if the message type is 'new_message_notification'
  //       // if (messageData.type === 'new_message_notification') {
  //       if (messageData.type === 'chat') {
  //         console.log("NEW MESSAGE RECEIVED")
  //         // Set the flag indicating a new message has been received
  //         // setNewMessageReceived(true);

  //         console.log(messageData.content)
  //         setMatches(prevMatches => {
  //           return prevMatches.map(match => {
  //             if (match.id === messageData.senderId) {
  //               return {
  //                 ...match,
  //                 lastMessage: messageData.content,  // Update the last message content
  //                 read: false  // Set read status to false as this is a new message
  //               };
  //             }
  //             return match;
  //           });
  //         });
  //         // **************************************************************************
  //         // BELOW CODE WORKED FOR MESSAGE NOTIFICATION
  //         // Fetch the last message between the current user and the sender of the new message
  //         // const lastMessage = await fetchMessages(userId.userId, messageData.sender_id, true);
  //         // console.log("if WS - Last message read status: ", lastMessage[0]?.read);  // Debugging line
  //         // // Update the 'matches' state to reflect the new last message for the corresponding chat
  //         // setMatches(prevMatches => {
  //         //   return prevMatches.map(match => {
  //         //     if (match.id === messageData.sender_id) {
  //         //       return {
  //         //         ...match,
  //         //         lastMessage: lastMessage[0]?.content || '',  // Update the last message content
  //         //         read: false  // Set read status to false as this is a new message
  //         //       };
  //         //     }
  //         //     return match;
  //         //   });
  //         // });
  //         // ABOVE CODE WORKED FOR MESSAGE NOTIFICATION
  //         // **************************************************************************

  //         // Reset the newMessageReceived flag back to false
  //         // setNewMessageReceived(false);
  //       }
  //     };
  //   } else {
  //     console.log("ws doesn't exist?")
  //   }
  // }, [ws]);  // useEffect dependencies: re-run if ws or newMessageReceived changes


  console.log("Current matches state before render: ", matches);

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
            <MatchesDisplay matches={matches} navigateToChat={(selectedUser) => navigateToChat(selectedUser, userId.userId)} />

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
            <MatchesDisplay matches={matches} navigateToChat={(selectedUser) => navigateToChat(selectedUser, userId.userId)} />

            <View style={{ flex: 0.7 }}>
              <Text style={settingsStyles.sectionTitle}>Messages</Text>
              <FlatList
                data={matches}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => navigateToChat(item, userId.userId)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                        {!readChats[item.id] && <View style={matchedUsersInterface.redDot}></View>}
                        {/* {!readChats[item.id] && !item.read && <View style={matchedUsersInterface.redDot}></View>} */}
                        {/* {!item.read && <View style={matchedUsersInterface.redDot}></View>} */}
                      </View>
                      <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
                        <Text>
                          {item.lastMessage.length > 40 ? `${item.lastMessage.substring(0, 40)}...` : item.lastMessage}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
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

  // const [matches, setMatches] = useState([]);
  // const [matches, setMatches] = useState([
  //   { id: '1', firstName: 'Alice', image: 'https://fightr.s3.eu-west-2.amazonaws.com/1690212638534-a4e2a195-e134-4005-a273-0f7eee79ccb2.jpg' },
  //   { id: '2', firstName: 'Bob', image: 'https://fightr.s3.eu-west-2.amazonaws.com/1690212638534-a4e2a195-e134-4005-a273-0f7eee79ccb2.jpg' },
  // ]);  

  // const [messages, setMessages] = useState([
  //   { id: '1', firstName: 'Alice', lastMessage: 'Hey, how are you?', profilePicture: 'https://fightr.s3.eu-west-2.amazonaws.com/1690212638534-a4e2a195-e134-4005-a273-0f7eee79ccb2.jpg' },
  //   { id: '2', firstName: 'Bob', lastMessage: 'What are you up to?', profilePicture: 'https://fightr.s3.eu-west-2.amazonaws.com/1690212638534-a4e2a195-e134-4005-a273-0f7eee79ccb2.jpg' },
  // { id: '3', firstName: 'Bob', lastMessage: 'What are you up to?', profilePicture: 'https://fightr.s3.eu-west-2.amazonaws.com/1690212638534-a4e2a195-e134-4005-a273-0f7eee79ccb2.jpg' },
  // { id: '4', firstName: 'Bob', lastMessage: 'What are you up to?', profilePicture: 'https://fightr.s3.eu-west-2.amazonaws.com/1690212638534-a4e2a195-e134-4005-a273-0f7eee79ccb2.jpg' },
  // { id: '5', firstName: 'Bob', lastMessage: 'What are you up to?', profilePicture: 'https://fightr.s3.eu-west-2.amazonaws.com/1690212638534-a4e2a195-e134-4005-a273-0f7eee79ccb2.jpg' },
  // { id: '6', firstName: 'Bob', lastMessage: 'What are you up to?', profilePicture: 'https://fightr.s3.eu-west-2.amazonaws.com/1690212638534-a4e2a195-e134-4005-a273-0f7eee79ccb2.jpg' },
  // { id: '7', firstName: 'Bob', lastMessage: 'What are you up to?', profilePicture: 'https://fightr.s3.eu-west-2.amazonaws.com/1690212638534-a4e2a195-e134-4005-a273-0f7eee79ccb2.jpg' },
  // { id: '8', firstName: 'Bob', lastMessage: 'What are you up to?', profilePicture: 'https://fightr.s3.eu-west-2.amazonaws.com/1690212638534-a4e2a195-e134-4005-a273-0f7eee79ccb2.jpg' },
  // { id: '9', firstName: 'Bob', lastMessage: 'What are you up to?', profilePicture: 'https://fightr.s3.eu-west-2.amazonaws.com/1690212638534-a4e2a195-e134-4005-a273-0f7eee79ccb2.jpg' },
  // { id: '10', firstName: 'Bob', lastMessage: 'What are you up to?', profilePicture: 'https://fightr.s3.eu-west-2.amazonaws.com/1690212638534-a4e2a195-e134-4005-a273-0f7eee79ccb2.jpg' },
  // { id: '11', firstName: 'Bob', lastMessage: 'What are you up to?', profilePicture: 'https://fightr.s3.eu-west-2.amazonaws.com/1690212638534-a4e2a195-e134-4005-a273-0f7eee79ccb2.jpg' },
  // { id: '12', firstName: 'Bob', lastMessage: 'What are you up to?', profilePicture: 'https://fightr.s3.eu-west-2.amazonaws.com/1690212638534-a4e2a195-e134-4005-a273-0f7eee79ccb2.jpg' },
  // ... more dummy data
  // ]);
  // const [messages, setMessages] = useState([]);

  // const userId = useSelector(state => state.user);
  // console.log("Big test", userId)  

  // const ws = getWebSocketInstance();

  // useEffect(() => {


  //   fetchData();

    // if (refreshData) {
    //   (async () => {
    //     const lastMessage = await fetchMessages(userId.userId, chatId, true);
    //     setMatches(prevMatches => {
    //       return prevMatches.map(match => {
    //         if (match.id === chatId) {
    //           return { ...match, lastMessage: lastMessage[0]?.content || '' };
    //         }
    //         return match;
    //       });
    //     });

    //     setRefreshData(false);  // Reset the refresh flag
    //   })();
    // }




    // if (ws) {
    //   ws.onmessage = async (event) => {  // Make this function async
    //     const messageData = JSON.parse(event.data);
    //     if (messageData.type === 'new_message_notification') {
    //       setNewMessageReceived(true);

    //       const lastMessage = await fetchMessages(userId.userId, messageData.sender_id, true);  // Fetch only the last message

    //       // Update the last message for the corresponding user
    //       setMatches(prevMatches => {
    //         return prevMatches.map(match => {
    //           if (match.id === messageData.sender_id) {
    //             return {
    //               ...match,
    //               lastMessage: lastMessage[0]?.content || '',
    //               read: false  // set read to false since this is a new message
    //             };
    //           }
    //           return match;
    //         });
    //       });
    //     }
    //   };
    // }
  // }, []);
